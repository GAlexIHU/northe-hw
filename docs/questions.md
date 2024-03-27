# Clarification Questions on the Assignment

## Questions

1. I only played around for a little, but there are quite a few bugs / inconveniences (date selections, console full of errors, interrupt signals ignored, blank pages, etc...) & just in general a lot of things would need fixing. Am I expected to fix those or only the bug outlined in the [assignment](/docs/assignment.md)?
2. If I should fix those, how much of the current setup / codebase am I expected to keep? After a first look I think it would probably take a lot less time for me to just use a starter project / change the tooling & migrate the functionality, than to make this a good experience.
3. For the K8S script, are there any non-funcitonals I have to account for? Should I treat it as if it were to run on K8S in prod? (how simple do you want me to keep it or what extras should I add... ?) Am I to use the current setup (with it's issues) and just deploy it as is?

## Thoughts

I think in general what my questions boil down to is that if I were to actually work on this codebase I would probably push to rewrite the entire thing as I have issues with it down to the repo setup, and I'd like to avoid that work. To be honest it sort-of reminds me of older Next codebases I saw 3-4 years ago.

I'd suggest I do the following, and I'd like to know if that's okay for the assignment:

1. Remove the enum from the validator to fix the bug.
2. Leave the rest of the application logic as is (with its issues).
3. Leave the repo setup as is, but change some of the scripts as that would be needed for the K8S deployment anyway.
4. Implement the K8S deployment with the local cluster management parts & treat it as part of the tooling. I'd still need some clarification on Question 3 for this.
5. I'd add a GH Actions CI for the code actually present in the repo after doing the previous changes.
6. I'd write a doc on 'everything' I have an issue with on how this app works / how it's setup (my take on repo setup & architecture & tool selections)
7. I'd write a design spec (md + drawio) for the AWS design if it was deployed there (what I would use, with the presumption that the suggestions in point 6 are implemented). I could also write some DR style comparisons on the different choices.
