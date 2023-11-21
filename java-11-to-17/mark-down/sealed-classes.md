## Sealed Classes
Added in Java 17<br/>
JEP 409
VV

### Sealed Classes
#### What are a Sealed Classes?
> A sealed class or interface can be extended or implemented only by those classes and interfaces permitted to do so.

VV
### Sealed Classes
#### Example

```java 
sealed interface IdentificationDocument
permits IdCard, Passport, DrivingLicence { }
```

```java [0|3|4]
final class IdCard implements IdentificationDocument { }
final class Passport implements IdentificationDocument { }
non-sealed class DrivingLicence implements IdentificationDocument { }
class InternationalDrivingPermit extends DrivingLicence {}
```

VV
### Sealed Classes
#### Below Fails!
```java
final String code = switch(identificationDocument) {
    case IdCard idCard -> "I";
    case Passport passport -> "P";
};
```
>  ...the switch expression does not cover all possible input values...

VV
### Sealed Classes
#### The correctd output
```java
final String code = switch(identificationDocument) {
    case IdCard idCard -> "I";
    case Passport passport -> "P";
    case DrivingLicence drivingLicence -> "D";
};
```
> All the permited options needs to be listed. <br>
`permits IdCard, Passport, DrivingLicence`