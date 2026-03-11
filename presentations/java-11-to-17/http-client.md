## HTTP Client
Added in Java 11 <br/>
JEP 321

VV

### HTTP Client

* Steps to use the HTTP Client
   * Create `HttpClient` instance using `HttpClient.newBuilder()` instance
   * Create `HttpRequest` instance using `HttpRequest.newBuilder()` instance
   * Make a request using `httpClient.send()` and get a response object.

VV

### HTTP Client


```java [0|2-5|8-11|14-15|0]
    //Step 1:
    HttpClient httpClient = HttpClient.newBuilder()
            .version(HttpClient.Version.HTTP_2)
            .connectTimeout(Duration.ofSeconds(10))
            .build();

    //Step 2:
    HttpRequest request = HttpRequest.newBuilder()
            .GET()
            .uri(URI.create("https://blog.vpv.io"))
            .build();

    // Step 3:
    HttpResponse<String> response = httpClient.send(request,
            HttpResponse.BodyHandlers.ofString()); 

```