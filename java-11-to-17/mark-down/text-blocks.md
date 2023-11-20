## Text Blocks

VV

## Text Blocks
Added in Java 15 <br/>
JEP 378

VV

### Text Blocks

#### Basic Usage

```java
String simpleJSONMessage = """
		{
		        "firstName": "Venkateswara",
		        "lastName": "Venkatraman Prasanna",
		        "jobTitle": "Principal Application Developer",
		        "twitterHandle": "@reflexdemon"
		}
		""";
```

VV

### Text Blocks

#### Escaping

##### Double-Quotes
```java [2|4]
String simpleMessage = """
		"fun" with
            whitespace
            and other escapes \"""
		""";
```

##### Spaces
```java [2-3|3]
String simpleMessage = """
            line 1·······
            line 2·······\s
            """;
```

VV

### Text Blocks

#### Formatting

```java
String formattedMessage = """
            Welcome %s,

            It is a pleasure you made it to the talk.
            """.formatted(name);;
```
