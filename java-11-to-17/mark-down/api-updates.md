## API Updates

VV

### Enhanced Pseudo-Random Number Generators

JDK 17<br/>
JEP 356

VV
### Enhanced Pseudo-Random Number Generators
> Provide new interface types and implementations for pseudorandom number generators (PRNGs), including jumpable PRNGs and an additional class of splittable PRNG algorithms (LXM).

* New Interfce: `RandomGenerator`
    * Interface is designed to provide a common protocol for objects that are PRNGs in nature
* For interfaces:
    * `RandomGenerator.SplittableRandomGenerator`
    * `RandomGenerator.JumpableRandomGenerator`
    * `RandomGenerator.LeapableRandomGenerator`
    * `RandomGenerator.ArbitrarilyJumpableRandomGenerator`
* Provides unified API across implementation to bring uniformity in random number generations.

VV

## Even More API Updates
Find them here 👇

> [https://docs.oracle.com/en/java/javase/21/docs/api/new-list.html](https://docs.oracle.com/en/java/javase/21/docs/api/new-list.html)

