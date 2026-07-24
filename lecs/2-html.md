## Page 1

Introduction to Web 
Technologies
SWE230 : 
WEB APPLICATION PROGRAMMING 
Spring 2026
Instructors
•
Sarah Nabil 
Sara.abdullah@miuegypt.edu.eg
•
Nada Ayman
nada.ayman@miuegypt.edu.eg
•
Nada AbdelFattah
nada.abdelfattah@miuegypt.edu.eg


---

## Page 2

HTML Elements Categories
• Structural Tags
• Meta Tags
• Text Formatting Tags
• List Tags
• Link Tags
• Image and Multimedia Tags
• Form Tags
• Scripting Tags


---

## Page 3

---

## Page 4

Famous Elements


---

## Page 5

Body, Head & Title


---

## Page 6

Body, Head & Title


---

## Page 7

Body, Head & Title


---

## Page 8

---

## Page 9

Meta Tags
Metadata is information about data.
<head>
<meta charset="utf-8">
<meta http-equiv="refresh" content=“10;url=https://www.google.com">
<meta name="description" content=“WWW Technologies">
<meta name="keywords" content="HTML,CSS,JavaScript,PHP, XML, AJAX">
<meta name="author" content="John Doe">
//Responsive Web Design
<meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>


---

## Page 10

---

## Page 11

Famous Elements


---

## Page 12

Header
<h1> (from 1 to 6)


---

## Page 13

Paragraph
<p>


---

## Page 14

Line Break
The <br> tag is used when you want to start a new line, but don't want to start a 
new paragraph. 
The <br> tag forces a line break wherever you place it. It is similar to single 
spacing in a document.


---

## Page 15

Horizontal Rule
<hr>
The element is used for horizontal rules that act as dividers between sections like 
this:


---

## Page 16

Special text feature elements

HTML defines special elements, for defining special text
features: <b> for bold text, <i> for italic text, <strong> for 
strong text, <em> for emphasized text

<br> for line break
<p>This text is normal.</p>
<p><b>This text is bold</b><br>
<strong>This text is strong</strong><br>
<br>
<i>This text is italic</i><br>
<em>This text is emphasized</em>
</p>
1
6


---

## Page 17

Text markup elements
<p>This text is normal.</p>
<p>HTML <small>Small</small> Text</p>
<p>HTML <mark>Marked</mark> Text</p>
<p>My favorite color is <del>blue</del> red.</p>
<p>My favorite <ins>color</ins> is red.</p>
<p>This is <sub>subscripted</sub> text.</p>
<p>This is <sup>superscripted</sup> text.</p>
1
7


---

## Page 18

---

## Page 19

Famous Elements
HTML (Hypertext Markup Langu


---

## Page 20

List
Lists:-HTML offers web authors three ways for specifying lists of information. 
All lists must contain one or more list elements. Lists are of three types
Un ordered list 
Ordered List 
Definitionlist


---

## Page 21

Unordered List
<ul>
An unordered list is a collection of related items that have no special order or 
sequence. This list is created by using HTML <ul> tag. Each item in the list is 
marked with a bullet.


---

## Page 22

Ordered List
<ol>
items are numbered list instead of bulleted, This list is created by using<ol>tag.


---

## Page 23

Ordered List
<ol>
items are numbered list instead of bulleted, This list is created by using<ol>tag.


---

## Page 24

Definition List
HTML and XHTML supports a list style which is called definition 
lists where entries are listed like in a dictionary or encyclopedia.
Definition List makes use of following three tags.
1). <dl> - Defines the start of the list 
2). <dt> - A term
3).<dd> - Term definition
4). </dl> - Defines the end of the list


---

## Page 25

Definition List


---

## Page 26

---

## Page 27

HTML Hyperlinks: anchor tag

Syntax
<a href="url">link text</a>
2
7
Example
<a href="http://www.w3schools.com/html/"> 
HTML tutorial</a>


---

## Page 28

Hyperlink
<a>
The element is used for linking to another resource like this:


---

## Page 29

href Attribute
The <a> tag defines a hyperlink. The href attribute specifies the URL of the page
the link goes to:
<a href="url">link text</a>
<a href="https://www.google.com">Google</a>


---

## Page 30

href Attribute
• < a >is referring to anchor (it has a main attribute called href hypertext
reference)
• user agent of stylesheet at text decoration is underline for any hyperlink
• note that: a is not block element it's inline element


---

## Page 31

href Attribute
By default, links will appear as follows in all browsers:
•
An unvisited link is underlined and blue
•
A visited link is underlined and purple
•
An active link is underlined and red


---

## Page 32

href Attribute


---

## Page 33

Absolute URLs vs. Relative URLs
Both examples at last slides are using an absolute URL (a full web address) in the href
attribute.
A local link (a link to a page within the same website) is specified with a relative URL
(without the "https://www" part):


---

## Page 34

Absolute URLs vs. Relative URLs
Absolute URL
Relative URL


---

## Page 35

Create a Bookmark in HTML
•
Bookmarks can be useful if a web page is very long.
•
To create a bookmark - first create the bookmark, then add a link to it.
•
When the link is clicked, the page will scroll down or up to the location with the
bookmark.


---

## Page 36

Create a Bookmark in HTML
•
Example
1. use the id attribute to create a bookmark:
<h2 id="C4">Chapter 4</h2>
2. add a link to the bookmark ("Jump to Chapter 4"), from within the same page:
<a href="#C4">Jump to Chapter 4</a>
OR
2. You can also add a link to a bookmark on another page:
<a href="html_demo.html#C4">Jump to Chapter 4</a>


---

## Page 37

Link to an Email Address
Use mailto: inside the href attribute to create a link that opens the user's 
email program (to let him send a new email):
Example
<a href="mailto:someone@example.com">Send email</a>
Use tel: inside the href attribute to create a link that opens the user’s 
phone program (to let him make a call):
Example
<a href=“tel:+201002548577">call office</a>


---

## Page 38

HTML Links - The target Attribute
By default, the linked page will be displayed in the current browser window. To
change this, you must specify another target for the link.
The target attribute specifies where to open the linked document.


---

## Page 39

HTML Links - The target Attribute


---

## Page 40

HTML Links - The target Attribute
By default, the linked page will be displayed in the current browser window. To
change this, you must specify another target for the link.
The target attribute specifies where to open the linked document.
The target attribute can have one of the following values:
_self - Default. Opens the document in the same window/tab as it was clicked
_blank - Opens the document in a new window or tab
_parent - Opens the document in the parent frame
_top - Opens the document in the full body of the window


---

## Page 41

HTML Links - The target Attribute
By default, the linked page will be displayed in the current browser window. To
change this, you must specify another target for the link.
The target attribute specifies where to open the linked document.
The target attribute can have one of the following values:
_self - Default. Opens the document in the same window/tab as it was clicked
_blank - Opens the document in a new window or tab
_parent - Opens the document in the parent frame
_top - Opens the document in the full body of the window


---

## Page 42

---

## Page 43

Famous Elements


---

## Page 44

Famous Elements


---

## Page 45

Image
<img>
insert any image in the web page by using <img>element.


---

## Page 46

HTML Images

JPG Images

GIF Images

PNG Images

Webp Images
<img src=“images/mountain.jpg" 
alt="Mountain View Image“>
4
6
https://developer.mozilla.org/en-
US/docs/Web/Media/Formats/Image_types


---

## Page 47

Using an Image as a Link
<a href=“mountains.html”>
<img src=“images/mountain.jpg” 
alt="Mountain View Image” 
style="width:128px;height:128px;
border:0;”>
</a>
4
7
Style 
attribute


---

## Page 48

The width and height Attributes
The <img> tag should also contain the width and height attributes, which specifies
the width and height of the image (in pixels):


---

## Page 49

The alt Attributes
The required alt attribute for the <img> tag specifies an alternate text for an image,
•
if the image for some reason cannot be displayed. This can be due to slow
connection,
•
if an error in the src attribute exists,
•
if the user uses a screen reader.


---

## Page 50

The alt Attributes


---

## Page 51

Style Attributes
The style attribute is used to add styles to an image, such as border, width, height
and more.
<img src=“images/mountain.jpg” 
alt="Mountain View Image” 
style="width:128px;height:128px;
border:0;”>
Style 
attribute


---

## Page 52

Style Attributes
Style attribute is a global attribute to html elements
style attribute is used to add styles to an element, such as color, font, size, and
more.


---

## Page 53

Style Attributes
Style 
attribute
Style 
attribute


---

## Page 54

Audio
<audio>
insert any audio in the web page by using < audio >element.
Example
<audio controls autoplay muted>
<source src="horse.ogg" type="audio/ogg">
<source src="horse.mp3" type="audio/mpeg">
Your browser does not support the audio element.
</audio>
•
controls attribute adds audio controls, like play, pause, and volume.
•
Autoplay muted attributes let the audio start playing automatically (but muted) which is a strict 
from some browsers to autoplay only if muted
•
<source> element allows you to specify alternative audio files which the browser may choose 
from. The browser will use the first recognized format.
•
text between the <audio> and </audio> tags will only be displayed in browsers that do not 
support the <audio> element


---

## Page 55

Video
<video>
insert any video in the web page by using <video>element.
Example
<video width="320" height="240" controls>
<source src="movie.mp4" type="video/mp4">
<source src="movie.ogg" type="video/ogg">
Your browser does not support the video tag.
</video>
•
controls attribute adds video controls, like play, pause, and volume.
•
Autoplay muted attributes let the video start playing automatically (but muted) which is a strict 
from some browsers to autoplay only if muted
•
<source> element allows you to specify alternative video files which the browser may choose 
from. The browser will use the first recognized format.
•
text between the <video> and </video> tags will only be displayed in browsers that do not 
support the <video> element
Example
<video width="320" height="240" autoplay muted>
<source src="movie.mp4" type="video/mp4">
<source src="movie.ogg" type="video/ogg">
Your browser does not support the video tag.
</video>


---

## Page 56

Video
<iframe>
An inline frame is used to embed another resource or document within the current 
HTML document.
embed any video in the web page from  youtube by using < iframe >element.
Example
<iframe src="https://www.youtube.com/embed/f1Kb5r-UIYQ?si=ww8HJoEPp2dlKqW1" width="560"
height="315"></iframe>
•
src has the embed url of youtube video 


---

## Page 57

Video
<embed> defines a container for an external resource, such as a web page, a 
picture, a media player, or a plug-in application 
Could use embed element with src as the url of the file and type as video type 
Example
<div style="width: 560px; height: 315px;">
<embed
src="movie.mp4"
type="video/mp4"
width="100%" height="100%">
</div>
•
src has the embed url of youtube video or local video file
Example
<div style="width: 560px; height: 315px;">
<embed
src="https://www.youtube.com/embed/f1Kb5r-
UIYQ?si=ww8HJoEPp2dlKqW1 "
type="video/mp4"
width="100%" height="100%">
</div>


---

## Page 58

---

## Page 59

Famous Elements
HTML (Hypertext Markup Langu


---

## Page 60

HTML Forms

The <form> element defines an HTML form
<form action="action_page.php" 
method="get">
First name:<br>
<input type="text" name="firstname">
<br>
Last name:<br>
<input type="text" name="lastname">
<br>
<input type="submit" value="Submit">
</form>
60


---

## Page 61

HTML
Input Types
6
1
<input type="text" name="firstname">
<input type="password" name="psw">
<input type="radio" name=“gender" 
value="male" checked> Male
<input type="checkbox" name="vehicle1" 
value="Bike"> I have a bike
<input type="submit" value="Submit">


---

## Page 62

HTML5 Input Types
6
2

color

date

datetime

datetime-local

email

month

number

range

search

tel

time

url

Week
Check: http://robertnyman.com/html5/forms/input-types.html


---

## Page 63

HTML
Form Elements
<select name="cars">
<option value="volvo">Volvo</option>
<option value="saab">Saab</option>
<option value="fiat">Fiat</option>
<option value="audi">Audi</option>
</select>
6
3


---

## Page 64

HTML
Form Elements
<textarea name="message" rows="10" 
cols="30">
The cat was playing in the garden.
</textarea>
<button type="button"
onclick="alert('Hello World!')"> 
Click Me!</button>
6
4


---

## Page 65

HTML5 <datalist> Element
<form action="action_page.php">
<input list="browsers" name="b1">
<datalist id="browsers">
<option value="Internet Explorer">
<option value="Firefox">
<option value="Chrome">
<option value="Opera">
<option value="Safari">
</datalist>
</form>
6
5


---

## Page 66

---

## Page 67

Famous Elements
HTML (Hypertext Markup Langu


---

## Page 68

---

## Page 69

HTML Tables
<table>
<tr>
<td>Jill</td>
<td>Smith</td>
<td>50</td>
</tr>
<tr>
<td>Eve</td>
<td>Jackson</td>
<td>94</td>
</tr>
</table>
69
<style>
table, th, td {
border:1px solid black;
border-collapse: collapse;
}
</style>
Update style for 
borders using style 
element


---

## Page 70

HTML Table Headings
<table style="width:100%">
<tr>
<th>Firstname</th>
<th>Lastname</th>
<th>Points</th>
</tr>
<tr>
<td>Eve</td>
<td>Jackson</td>
<td>94</td>
</tr>
</table>
7
0


---

## Page 71

Span Table Columns Cells
7
1
<table style="width:100%">
<tr>
<th>Name</th>
<th
colspan="2">Telephone</th>
</tr>
<tr>
<td>Bill Gates</td>
<td>555 77 854</td>
<td>555 77 855</td>
</tr>
</table>


---

## Page 72

Span Table Row Cells
72
<table style="width:100%">
<tr>
<th>Name:</th>
<td>BillGates</td>
</tr>
<tr>
<th rowspan="2">Telephone:</th>
<td>555 77 854</td>
</tr>
<tr>
<td>555 77 855</td>
</tr>
</table>


---

## Page 73

Table With a Caption
7
3
<table style="width:100%">
<caption>Monthly savings</caption>
<tr>
<th>Month</th>
<th>Savings</th>
</tr>
<tr>
<td>January</td>
<td>100</td>
</tr>
</table>


---

## Page 74

HTML Table with Cell Padding
table, th, td {
border: 1px solid black; 
border-collapse: collapse;
}
th, td {
padding: 10px;
}
7
4


---

## Page 75

Important tags: HTML5 semantic tags


---

## Page 76

HTML5
7
6
Structure : HTML defines the arrangement of and relations 
between web page elements.
Semantics : HTML5 provide enhanced semantics to make web 
content more meaningful.
A semantic element clearly describes its meaning to both 
the browser and the developer.


---

## Page 77

Why are web semantics important?
Automated services like search 
engines make it easy for users to 
find and access content.
If that content is markedup 
semantically, it's much easier for it to 
be indexed, parsed and found.
Semantics 
(meaningful content)
=
content more significant
7
7


---

## Page 78

Group related elements together (Ex.)
7
8
<body>
<header>
<!--Navigation and branding go here-->
</header>
<main>
<!--Latest Articles-->
<!--Useful Links-->
<!--HTML5 for mobile-->
</main>
<footer>
<!--Copyright and contact info go here-->
</footer>
</body>


---

## Page 79

Navigation
7
9
<header>
<!--Navigation and branding go here-->
<nav>
<ul>
<li><a href="#">Home</a></li>
<li><a href="#">About</a></li>
<li><a href="#">Register</a></li>
<li><a href="#">Sign in</a></li>
</ul>
</nav>
<img src="images/brand.jpg">
</header>


---

## Page 80

Some semantic elements
• In HTML there are several semantic elements that can be used to 
define different parts of a web page: 
•
<article>
•
<aside>
•
<details>
•
<figcaption>
•
<figure>
•
<footer>
•
<header>
•
<main>
•
<mark>
•
<nav>
•
<section>
•
<summary>
•
<time>


---

## Page 81

Some semantic elements
•
The appearance of aside , details and summary  without styling


---

## Page 82

Some semantic elements
•
The appearance of aside , details and summary  After styling


---

## Page 83

Block vs inline elements and attributes


---

## Page 84

Block-level Elements

A block-level element always starts on a new line and takes up the full 
width available (stretches out to the left and right as far as it can).

<div>

<h1> - <h6>

<p>

The <div> Element:
A block-level element that is often used as a container for other HTML 
elements. It is used together with CSS to style blocks of content
<div style="background-color:black; 
color:white; padding:20px;"> … </div>
8
4


---

## Page 85

Inline Elements

An inline element does not start on a new line and only takes up as 
much width as necessary

<span>

<a>

<img>

The <span> Element:
An inline element that is often used as a container for other HTML 
elements. It is used together with CSS to style parts of the text
<span style="color:red">Important</span>
8
5


---

## Page 86

References
https://html.com/
https://developer.mozilla.org/en-
US/docs/Web/HTML
https://www.w3schools.com/


---

## Page 87

QUESTIONS


---

