# Java 11 ➡ 17

Venkateswara VP
<br/>
🅧 @reflexdemon

>>
## Agenda
* Key Language Highlights
    * Http Client (Standard) [JEP 321](https://openjdk.org/jeps/321)
    * `switch` Expressions (Standard) [JEP 361](https://openjdk.org/jeps/361)
    * Text Blocks `"""` [JEP 378](https://openjdk.org/jeps/378) 
    * Pattern Matching for `instanceof` [JEP 394](https://openjdk.org/jeps/394)
    * `records` [JEP 395](https://openjdk.org/jeps/395)
    * Sealed Classes [JEP 409](https://openjdk.org/jeps/409)
* API Highlights
    * Enhanced Pseudo-Random Number Generators [JEP 356](https://openjdk.org/jeps/356)
* New Runtime Features and Improvements
    * Helpful `NullPointerExceptions` [JEP 358](https://openjdk.org/jeps/358)
* More changes
    * Addeditions, Deprecations, Removal and Other Changes

VV
## Changelog

```text [0|1,7|34,42|51,60|66,80,81|84,93|0]
* Changes in 11
 - Nest-Based Access Control  JEP 181: https://openjdk.org/jeps/181
 - Dynamic Class-File Constants  JEP 309: https://openjdk.org/jeps/309
 - Improve Aarch64 Intrinsics  JEP 315: https://openjdk.org/jeps/315
 - Epsilon: A No-Op Garbage Collector  JEP 318: https://openjdk.org/jeps/318
 - Remove the Java EE and CORBA Modules  JEP 320: https://openjdk.org/jeps/320
 - HTTP Client (Standard)  JEP 321: https://openjdk.org/jeps/321
 - Local-Variable Syntax for Lambda Parameters  JEP 323: https://openjdk.org/jeps/323
 - Key Agreement with Curve25519 and Curve448  JEP 324: https://openjdk.org/jeps/324
 - Unicode 10  JEP 327: https://openjdk.org/jeps/327
 - Flight Recorder  JEP 328: https://openjdk.org/jeps/328
 - ChaCha20 and Poly1305 Cryptographic Algorithms  JEP 329: https://openjdk.org/jeps/329
 - Launch Single-File Source-Code Programs  JEP 330: https://openjdk.org/jeps/330
 - Low-Overhead Heap Profiling  JEP 331: https://openjdk.org/jeps/331
 - Transport Layer Security (TLS) 1.3  JEP 332: https://openjdk.org/jeps/332
 - ZGC: A Scalable Low-Latency Garbage Collector(Experimental)  JEP 333: https://openjdk.org/jeps/333
 - Deprecate the Nashorn JavaScript Engine  JEP 335: https://openjdk.org/jeps/335
 - Deprecate the Pack200 Tools and API  JEP 336: https://openjdk.org/jeps/336
* Changes in 12
 - Shenandoah: A Low-Pause-Time Garbage Collector (Experimental)  JEP 189: https://openjdk.org/jeps189)
 - Microbenchmark Suite  JEP 230: https://openjdk.org/jeps/230
 - Switch Expressions (Preview)  JEP 325: https://openjdk.org/jeps/325
 - JVM Constants API  JEP 334: https://openjdk.org/jeps/334
 - One AArch64 Port, Not Two  JEP 340: https://openjdk.org/jeps/340
 - Default CDS Archives  JEP 341: https://openjdk.org/jeps/341
 - Abortable Mixed Collections for G1  JEP 344: https://openjdk.org/jeps/344
 - Promptly Return Unused Committed Memory from G1  JEP 346: https://openjdk.org/jeps/346
* Changes in 13
 - Dynamic CDS Archives  JEP 350: https://openjdk.org/jeps/350
 - ZGC: Uncommit Unused Memory  JEP 351: https://openjdk.org/jeps/351
 - Reimplement the Legacy Socket API  JEP 353: https://openjdk.org/jeps/353
 - Switch Expressions (Preview)  JEP 354: https://openjdk.org/jeps/354
 - Text Blocks (Preview)  JEP 355: https://openjdk.org/jeps/355
* Changes in 14
 - Pattern Matching for instanceof (Preview)  JEP 305: https://openjdk.org/jeps/305
 - Packaging Tool (Incubator)  JEP 343: https://openjdk.org/jeps/343
 - NUMA-Aware Memory Allocation for G1  JEP 345: https://openjdk.org/jeps/345
 - JFR Event Streaming  JEP 349: https://openjdk.org/jeps/349
 - Non-Volatile Mapped Byte Buffers  JEP 352: https://openjdk.org/jeps/352
 - Helpful NullPointerExceptions  JEP 358: https://openjdk.org/jeps/358
 - Records (Preview)  JEP 359: https://openjdk.org/jeps/359
 - Switch Expressions (Standard)  JEP 361: https://openjdk.org/jeps/361
 - Deprecate the Solaris and SPARC Ports  JEP 362: https://openjdk.org/jeps/362
 - Remove the Concurrent Mark Sweep (CMS) Garbage Collector  JEP 363: https://openjdk.org/jeps/363
 - ZGC on macOS  JEP 364: https://openjdk.org/jeps/364
 - ZGC on Windows  JEP 365: https://openjdk.org/jeps/365
 - Deprecate the ParallelScavenge + SerialOld GC Combination  JEP 366: https://openjdk.org/jeps/366
 - Remove the Pack200 Tools and API  JEP 367: https://openjdk.org/jeps/367
 - Text Blocks (Second Preview)  JEP 368: https://openjdk.org/jeps/368
 - Foreign-Memory Access API (Incubator)  JEP 370: https://openjdk.org/jeps/370
* Changes in 15
 - Edwards-Curve Digital Signature Algorithm (EdDSA)  JEP 339: https://openjdk.org/jeps/339
 - Sealed Classes (Preview)  JEP 360: https://openjdk.org/jeps/360
 - Hidden Classes  JEP 371: https://openjdk.org/jeps/371
 - Remove the Nashorn JavaScript Engine  JEP 372: https://openjdk.org/jeps/372
 - Reimplement the Legacy DatagramSocket API  JEP 373: https://openjdk.org/jeps/373
 - Disable and Deprecate Biased Locking  JEP 374: https://openjdk.org/jeps/374
 - Pattern Matching for instanceof (Second Preview)  JEP 375: https://openjdk.org/jeps/375
 - ZGC: A Scalable Low-Latency Garbage Collector  JEP 377: https://openjdk.org/jeps/377
 - Text Blocks  JEP 378: https://openjdk.org/jeps/378
 - Shenandoah: A Low-Pause-Time Garbage Collector  JEP 379: https://openjdk.org/jeps/379
 - Remove the Solaris and SPARC Ports  JEP 381: https://openjdk.org/jeps/381
 - Foreign-Memory Access API (Second Incubator)  JEP 383: https://openjdk.org/jeps/383
 - Records (Second Preview)  JEP 384: https://openjdk.org/jeps/384
 - Deprecate RMI Activation for Removal  JEP 385: https://openjdk.org/jeps/385
* Changes in 16
 - Vector API (Incubator)  JEP 338: https://openjdk.org/jeps/338
 - Enable C++14 Language Features  JEP 347: https://openjdk.org/jeps/347
 - Migrate from Mercurial to Git  JEP 357: https://openjdk.org/jeps/357
 - Migrate to GitHub  JEP 369: https://openjdk.org/jeps/369
 - ZGC: Concurrent Thread-Stack Processing  JEP 376: https://openjdk.org/jeps/376
 - Unix-Domain Socket Channels  JEP 380: https://openjdk.org/jeps/380
 - Alpine Linux Port  JEP 386: https://openjdk.org/jeps/386
 - Elastic Metaspace  JEP 387: https://openjdk.org/jeps/387
 - Windows/AArch64 Port  JEP 388: https://openjdk.org/jeps/388
 - Foreign Linker API (Incubator)  JEP 389: https://openjdk.org/jeps/389
 - Warnings for Value-Based Classes  JEP 390: https://openjdk.org/jeps/390
 - Packaging Tool  JEP 392: https://openjdk.org/jeps/392
 - Foreign-Memory Access API (Third Incubator)  JEP 393: https://openjdk.org/jeps/393
 - Pattern Matching for instanceof  JEP 394: https://openjdk.org/jeps/394
 - Records  JEP 395: https://openjdk.org/jeps/395
 - Strongly Encapsulate JDK Internals by Default  JEP 396: https://openjdk.org/jeps/396
 - Sealed Classes (Second Preview)  JEP 397: https://openjdk.org/jeps/397
* Changes in 17
 - Restore Always-Strict Floating-Point Semantics  JEP 306: https://openjdk.org/jeps/306
 - Enhanced Pseudo-Random Number Generators  JEP 356: https://openjdk.org/jeps/356
 - New macOS Rendering Pipeline  JEP 382: https://openjdk.org/jeps/382
 - macOS/AArch64 Port  JEP 391: https://openjdk.org/jeps/391
 - Deprecate the Applet API for Removal  JEP 398: https://openjdk.org/jeps/398
 - Strongly Encapsulate JDK Internals  JEP 403: https://openjdk.org/jeps/403
 - Pattern Matching for switch (Preview)  JEP 406: https://openjdk.org/jeps/406
 - Remove RMI Activation  JEP 407: https://openjdk.org/jeps/407
 - Sealed Classes  JEP 409: https://openjdk.org/jeps/409
 - Remove the Experimental AOT and JIT Compiler  JEP 410: https://openjdk.org/jeps/410
 - Deprecate the Security Manager for Removal  JEP 411: https://openjdk.org/jeps/411
 - Foreign Function &amp; Memory API (Incubator)  JEP 412: https://openjdk.org/jeps/412
 - Vector API (Second Incubator)  JEP 414: https://openjdk.org/jeps/414
 - Context-Specific Deserialization Filters  JEP 415: https://openjdk.org/jeps/415

```