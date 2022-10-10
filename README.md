<font size=80>***J@xL1nK***</font> by [Jank3x+r3!](https://twitter.com/Jank3xtr31)

This app allows you to associate a tag to multiple links, so you can better organize your online tools, without having to create folders in which to collect the various tools, wasting time to find them. For example, I am a web developer, I have online tools to be able to create linear gradients, create box-shadow and etc. Just copy the tool link and associate a tag.
> **_Example 1_** CSS Tool -> www.box-shadow-generetor.com
> **_Example 2_** CSS Tool -> www.box-shadow-generetor2.com
> **_Example 3_** CSS Tool -> www.lineargradientgeneretor.com

**Requires [NodeJs](https://nodejs.org/en/)**
**Requires [ExpressJs](https://expressjs.com)**
**Requires [Sqllite3](https://www.sqlitetutorial.net/sqlite-nodejs/)**


##Version 1.0

- Associate a tag to multiple links
- Search for a tag
- Creates a tag associated with a link
- List of all tags present
- The tag-links are shown in a table
- Opens the link on a new page


##HOW DOEAS IT WORK?
The server side is managed by NodeJs and ExpressJs. The client side is handled by Bootstrap 5.2.
When you add a data it is saved in the database.
When it is requested the data is extracted, written to a json file and then read through js fetch.
