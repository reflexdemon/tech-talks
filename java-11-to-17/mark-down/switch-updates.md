## Switch Expressions
Added in Java 14 <br/>
JEP 361
VV

### Switch Expressions
#### Old
```java [0|2-10|11-12|0]
switch (day) {
    case MONDAY:
    case TUESDAY:
    case WEDNESDAY:
    case THURSDAY:
        expectedWorkingTime = 8.0;
        break;
    case FRIDAY:
        expectedWorkingTime = 6.0;
        break;
    default:
        expectedWorkingTime = 0.0;
}
```
#### New
```java [0|2-3|4]
final float expectedWorkingTime = switch (day) {
    case MONDAY, TUESDAY, WEDNESDAY, THURSDAY -> 8.0;
    case FRIDAY -> 6.0;
    default -> 0.0;
};
```


VV

### Switch Expressions
#### Switch Case Assignment
```java
String day = switch(d){
	case 1 -> "Sunday";
	case 2 -> "Monday";
	case 3 -> "Tuesday";
	case 4 -> "Wednesday";
	case 5 -> "Thursday";
	case 6 -> "Friday";
	case 7 -> "Saturday";
	default -> throw new IllegalArgumentException();
}
```


VV

### Switch Expressions
#### Switch Case `yield`
```java [0|2-7|3-5|6|8|9]
double expectedWorkingTime = switch (day) {
    case MONDAY, TUESDAY, WEDNESDAY, THURSDAY -> {
        if (isFullTimeEmployee) {
            yield 8.0;
        }
        yield 4.0;
    }
    case FRIDAY -> 6.0;
    default -> 0.0;
};
```

- How is `yield` different to `return`?      <!-- .element: class="fragment" data-fragment-index="1" -->
    - A `return` statement returns control to the invoker of a method or constructor while a `yield` statement transfers control by causing an enclosing `switch` expression to produce a specified value.  <!-- .element: class="fragment" data-fragment-index="2" -->