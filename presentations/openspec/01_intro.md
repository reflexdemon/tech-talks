## Spec-Driven Development (SDD)
using
<h3 style="font-family: 'Silkscreen', 'Chakra Petch', sans-serif; font-size: 2.5em; letter-spacing: 5px; text-transform: uppercase; color: #fff;">OPENSPEC</h3>


VV

## About Me

<div class="profile-container">
<img src="./images/vp-profile.jpg" class="profile-circle" alt="Venkateswara VP">
<div class="about-text">
<p>
My name is Venkateswara VP. I am a Principal Application Developer at ADP. I have been coding for 22+ years. I started the AI journey recently and I am exploring the possibilities of AI in software development. 
</p>
<p>
I am a big fan of open source software.
</p>
<p>
<i class="devicon-twitter-original"></i> 
<i class="devicon-github-original"></i> @reflexdemon
<br>
<i class="devicon-linkedin-plain"></i>/venkatvp
</p>
</div>
</div>

>>

## Agenda
* The `Vibe Coding` Reality
* Spec-driven development (SDD)
* Tools for SDD
* <span style="font-family: 'Silkscreen', 'Chakra Petch', sans-serif; font-size: 1em; letter-spacing: 1px; text-transform: uppercase; color: #fff;">OPENSPEC</span>
    * How does it help?
    * Getting started
    * Demo App Building using <span style="font-family: 'Silkscreen', 'Chakra Petch', sans-serif; font-size: 1em; letter-spacing: 1px; text-transform: uppercase; color: #fff;">OPENSPEC</span>
* Live Demo - Using <span style="font-family: 'Silkscreen', 'Chakra Petch', sans-serif; font-size: 1em; letter-spacing: 1px; text-transform: uppercase; color: #fff;">OPENSPEC</span>
* What's next?
* Q&A


VV
## The `Vibe Coding` Reality
<img src="images/vibe-coding.png" width="450" alt="Vibe Coding"/>

Note: How many of you vibe code?

VV

### Outcome of `Vibe Coding`?
* **Inconsistency** <!-- .element: class="fragment" -->
    - Output varies wildly between prompts.
* **Lack of Maintainability** <!-- .element: class="fragment" -->
    - Logic is hidden in chat history.
* **Hidden Debt** <!-- .element: class="fragment" -->
    - "Black box" code generation leads to bugs.



VV

## Developer Problems

1. Writing documentation
2. Lack of documentation
 

 VV

# Agent flow
```mermaid
gitGraph
  commit id: "Agent"
  
  branch Assumption_1
  commit id: "1.1"
  commit id: "1.2"
  
  checkout main
  branch Assumption_2
  commit id: "2.1"
  commit id: "2.2"
  
  checkout main
  branch Assumption_3
  commit id: "3.1"
  commit id: "3.2"
  
  checkout main
  branch Assumption_4
  commit id: "4.1"
  commit id: "4.2"
  
  checkout main
  branch Assumption_5
  commit id: "5.1"
  commit id: "5.2"
```
