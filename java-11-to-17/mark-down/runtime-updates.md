## New Runtime Features and Improvements
VV

## ZGC
* JDK 15 
* JEP 377
* (Ultra-)Low Latency (<1 ms pause times)
* Scalable (multi-terabyte heaps)
* Single generation, planned to become multi-generation soon
* Get started: `-XX:+UseZGC -Xmx<size> -Xlog:gc`

Video: [https://www.youtube.com/watch?v=U2Sx5lU0KM8](https://www.youtube.com/watch?v=U2Sx5lU0KM8)
VV

## Helpful Null Pointer Exceptions
JDK 14 <br/>
JEP 358
VV

### Helpful Null Pointer Exceptions

#### Example
```java [0|4]
public class Main {
	public static void main(String argv[]) {
		Integer x = null;
		System.out.printf("Value of x is %s", x.toString());
	}
}
```
#### Old
``` [0]
Exception in thread "main" java.lang.NullPointerException
	at Main.main(Main.java:4)
```

#### New
``` [0|2]
Exception in thread "main" java.lang.NullPointerException:
 Cannot invoke "java.lang.Integer.toString()" because "<local1>" is null
	at Main.main(Main.java:4)
```

VV

## AArch64 Support

* Linux JDK 9 (JEP 237)
* Windows JDK 16 (JEP 388)
* macOS JDK 17 (JEP 391)
