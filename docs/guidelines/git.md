# Git [guidelines](https://marlownavigation.atlassian.net/wiki/spaces/M2/pages/101089333/Git+Guidelines)

## 1. Branching Guidelines

### 1.1. Naming Convention:

1. **[REQUIRED]** Prefix branch names with one of the following keywords:
   1. `feature/` if this is a new feature to be implemented
   1. `fix/` if this is a bug fix on dev or qa
   1. `hotfix/` if this is a bug fix identified on production that
      needs to be released in prod
1. **[REQUIRED]** After the prefixed keyword [(1)](#Branching-Guidelines) add the Jira ticket number `mcm-XXXX`.
1. **[OPTIONAL]** Short description of the jira ticket in [(2)](#Branching-Guidelines).

**[Example]** For a Jira ticket `MCM-123` with title `Create Login Screen` we should
create a branch called `feature/mcm-123/login-screen`

### 1.2 Branching Convention:

When picking up a new story to work, we should create a new branch
from dev for this specific story. If the story is split in
multiple sub-tasks we should create a new branch for each sub-tasks
that will be branched from the story.

## 2. Commits guidelines

1. **Useful descriptions**, not just writing for writing.
   Descriptions should be meaningful but minimal text (see minimalism principle)
   that can help us understand the
   context of what we did back then. When something goes wrong this is the 1st
   place where we look at to understand why we did what we did.
2. **Descriptions should match the JIRA ticket's context**. The descriptions
   should talk at the same level as the requirements (JIRA ticket) so that
   we can understand the solution in terms of the problem.
   Commits such as _"made it work"_, _"removed nulls"_
   doesn't give much value when you look back to the history and when the
   requirement was e.g. _"introduce open pricing"_.
3. **Always link to JIRA ticket**. Accountability is important. The more upfront
   work we do to link our code to requirements the easier it will be to understand
   our history and the quicker it will be to fix things.
4. **Use `[mcm-XXXX]` as the commit JIRA preamble**.
   We make it a standard, we follow it.
5. **Minimum number of commits**. We need to keep our git history as clean
   and meaningful as possible.
6. **Cohesive commits**. Think of commits as transactions that introduce changes
   to the system. A transaction needs to be cohesive. It cannot leave the system
   broken or half-made and exposed to errors.
7. **Separate commits when they are separate pieces of work**.
   If, during the work, we introduce a generic component, then that new component
   should belong on its own commit as it is a deliverable on its own and not
   tied to the specific work that we are doing (even though that specific work is
   the 1st example of its usage). E.g. If when dealing with column names we
   introduce a String utility that turns camelCase to snake_case, that utility
   feature should be offered in a separate cohesive commit to the rest of the work.

## 3. Pull Request guidelines

### PR Goals:

1. identify and fix weak or unclear code
2. spread knowledge in the team

### Steps:

1. Use `[mcm-XXXX]` as the commit JIRA preamble if applicable
2. Create a PR and assign reviewers
3. Reviewers leave comments
4. Author replies to every comment with either “done” or the reason why
   they won’t change
5. This process (steps 2 and 3) repeat until the reviewers are happy
6. Reviewers approve
7. Author merges branch

### Good practice:

1. Review comments should be specific. Not

- **NOT OK:** “I know this other library that can do this better”.
- **OK:** “I think this would be more readable with an intermediate variable.”

2. Review your own PRs
3. Reviews take precedence over your own coding. It’s frustrating to be blocked on
   a review for long
4. When submitting PRs make sure the style etc are in good shape so the reviewer
   can focus on actual problems, not stylistic problems
