## New Runtime Features and Improvements
VV

## Z Garbage Collector (ZGC)

* Releases
	* 11: ZGC: A Scalable Low-Latency Garbage Collector (Experimental) [JEP 333](https://openjdk.org/jeps/333)
	* 13: ZGC: Uncommit Unused Memory [JEP 351](https://openjdk.org/jeps/351)
	* 15: ZGC: A Scalable Low-Latency Garbage Collector [JEP 377](https://openjdk.org/jeps/377)
	* 16: ZGC: Concurrent Thread-Stack Processing [JEP 376](https://openjdk.org/jeps/376)
* Get started: `-XX:+UseZGC -Xmx<size> -Xlog:gc`


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
#### Old <!-- .element: class="fragment" data-fragment-index="1" -->
``` [0]
Exception in thread "main" java.lang.NullPointerException
	at Main.main(Main.java:4)
```
<!-- .element: class="fragment" data-fragment-index="1" -->

#### New <!-- .element: class="fragment" data-fragment-index="2" -->
``` [0|2]
Exception in thread "main" java.lang.NullPointerException:
 Cannot invoke "java.lang.Integer.toString()" because "<local1>" is null
	at Main.main(Main.java:4)
```
<!-- .element: class="fragment" data-fragment-index="2" -->

VV

## AArch64 Support

* Linux JDK 9 (JEP 237)
* Windows JDK 16 (JEP 388)
* macOS JDK 17 (JEP 391)
