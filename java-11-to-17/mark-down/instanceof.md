## Pattern Matching for `instanceof`

Added in Java 16 <br/>
JEP 394

VV

### Pattern Matching for `instanceof`

#### Old Style
```java [0|2-4|5-7|8-10]
Object someNumberType = ...
if(someNumberType instanceof Integer) {
    Integer i = (Integer) someNumberType
	//do work with i
} else if (someNumberType instanceof Long l) {
    Long l = (Integer) someNumberType
	//do work with l
} else if (someNumberType instanceof Double d) {
    Double d = (Integer) someNumberType
	//do work with d
}
```
VV

### Pattern Matching for `instanceof`

#### New Style
```java [0|2|4|6]
Object someNumberType = ...
if(someNumberType instanceof Integer i) {
	//do work with i
} else if (someNumberType instanceof Long l) {
	//do work with l
} else if (someNumberType instanceof Double d) {
	//do work with d
}
```
