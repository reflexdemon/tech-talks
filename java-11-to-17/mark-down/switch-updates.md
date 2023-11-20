## `switch` Updates
Added in Java 14 <br/>
JEP 361
VV

### `switch` Updates
#### Old Style
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
#### New Style
```java [0|2-3|4]
final float expectedWorkingTime = switch (day) {
    case MONDAY, TUESDAY, WEDNESDAY, THURSDAY -> 8.0;
    case FRIDAY -> 6.0;
    default -> 0.0;
};
```


VV

### `switch` Updates
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

### `switch` Updates
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