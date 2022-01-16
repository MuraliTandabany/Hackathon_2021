using Amazon;
using Amazon.S3;
using Amazon.S3.Model;
using ArtMapLambdaAPI.Models;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;


namespace ArtMapLambdaAPI.Services
{
    public interface IS3Service
    {
        Task<List<ArtMap>> GetMaps();
    }
    public class S3Service : IS3Service
    {
        private readonly RegionEndpoint region;
        private readonly string bucketName;
        private readonly string objectName;
        public S3Service(IConfiguration configuration)
        {
            region = GetRegion(configuration.GetSection("AWSS3").GetSection("Region").Value);
            bucketName = configuration.GetSection("AWSS3").GetSection("BucketName").Value;
            objectName = configuration.GetSection("AWSS3").GetSection("ObjectName").Value;
        }

        public async Task<List<ArtMap>> GetMaps()
        {
            try
            {
                List<ArtMap> artMaps = new List<ArtMap>();
                // Create a client
                AmazonS3Client client = new AmazonS3Client(region);

                ListObjectsRequest listRequest = new ListObjectsRequest
                {
                    BucketName = bucketName,
                    Prefix = objectName
                };

                ListObjectsResponse listResponse = await client.ListObjectsAsync(listRequest);
                foreach (S3Object obj in listResponse.S3Objects)
                {
                    if (obj.Key.IndexOf(".") > 0)
                    {
                        // Create a GetObject request
                        GetObjectRequest request = new GetObjectRequest
                        {
                            BucketName = bucketName,
                            Key = obj.Key
                        };

                        using (GetObjectResponse response = await client.GetObjectAsync(request))
                        {
                            if (response.HttpStatusCode == System.Net.HttpStatusCode.OK)
                            {
                                // Deserialize Model and send to controller
                                using (StreamReader reader = new StreamReader(response.ResponseStream))
                                {
                                    artMaps.Add(new ArtMap()
                                    {
                                        FileContent = ReadStream(response.ResponseStream),
                                        FileName = Path.GetFileName(response.Key),
                                        FilePath = response.Key,
                                        CountryName = obj.Key.Split("/")[1]
                                    });
                                }
                            }
                            else
                            {
                                throw new Exception("AWS S3 service call did not respond with OK status");
                            }
                        }
                    }
                }
                return artMaps;
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        private RegionEndpoint GetRegion(string value)
        {
            if (string.IsNullOrEmpty(value)) return RegionEndpoint.USWest2;
            switch (value)
            {
                case "us-west-2":
                    return RegionEndpoint.USWest2;
                case "us-west-1":
                    return RegionEndpoint.USWest1;
                case "us-east-1":
                    return RegionEndpoint.USEast1;
                case "us-east-2":
                    return RegionEndpoint.USEast2;
                case "eu-central-1":
                    return RegionEndpoint.EUCentral1;
                case "eu-west-1":
                    return RegionEndpoint.EUWest1;
                case "ca-central-1":
                    return RegionEndpoint.CACentral1;
                default:
                    return RegionEndpoint.USWest2;
            }
        }

        public static byte[] ReadStream(Stream responseStream)
        {
            byte[] buffer = new byte[16 * 1024];
            using (MemoryStream ms = new MemoryStream())
            {
                int read;
                while ((read = responseStream.Read(buffer, 0, buffer.Length)) > 0)
                {
                    ms.Write(buffer, 0, read);
                }
                return ms.ToArray();
            }
        }
    }
}
