## Page 1

Introduction to 
Web Technologies
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

overview


---

## Page 3

▰What is ?
Cascading Style Sheets ( ) is used to format the layout of a webpage.
▰The word cascading means that a style applied to a parent element will also
apply to all children elements within the parent. So, if you set the color of the
body text to "blue", all headings, paragraphs, and other text elements within the
body will also get the same color (unless you specify something else)!


---

## Page 4

Syntax
▰A rule consists of a selector and a declaration block.


---

## Page 5

Using  
▰can be added to HTML documents in 3 ways:
1- Inline - by using the style attribute inside HTML elements
2- Internal - by using a <style> element in the <head> section
3- External - by using a <link> element to link to an external file
▰The most common way to add , is to keep the styles in external files.


---

## Page 6

1- Inline  
▰An inline is used to apply a unique style to a single HTML element.
▰An inline uses the style attribute of an HTML element.
▰The following example sets the text color of the <h1> element to blue, and the
text color of the <p> element to red:


---

## Page 7

2- Internal  
▰An internal is used to define a style for a single HTML page.
▰An internal is defined in the <head> section of an HTML page, within a <style>
element.


---

## Page 8

2- Internal  
▰The following example sets the text color of ALL the <h1> elements (on that
page) to blue, and the text color of ALL the <p> elements to red. In addition, the
page will be displayed with a "powderblue" background color:


---

## Page 9

3- External  
▰An external style sheet is used to define the style for many HTML pages.
▰To use an external style sheet, add a link to it in the <head> section of each
HTML page:
▰The external style sheet can be written in any text editor. The file must not
contain any HTML code, and must be saved with a .css extension.


---

## Page 10

3- External  


---

## Page 11

3- External  


---

## Page 12

3- External  
OUTPUT


---

## Page 13

Link to External  
▰External style sheets can be referenced with a full URL or with a
path relative to the current web page.


---

## Page 14

---

## Page 15

Rules


---

## Page 16

CSS Rules
Style sheet contain one or more
Rules


---

## Page 17

CSS Rules (  selector)
•
Simple Selector
•
Element selector (or tag selector): specific to element type
•
Class selector: specific to class attribute value of an HTML element (use .)
•
ID selector: specific to id attribute value of an HTML element( use #)
•
Pseudo- class Selector : specifies a special state of the selected element based on their state or
position in the document tree. (use simple selector: pseudo-class)
•
Multiple Selector (or group selector): specify a group of selectors (use , to separate them)


---

## Page 18

CSS Rules (Simple Selector)


---

## Page 19

CSS Rules (Pseudo-classes and Pseudo-elements)
• Pseudo-classes select elements based on their state (like hover, focus, link and
visited) or position in the document tree( like first-child and nth-child()). They
are denoted by a single colon (simple selector: pseudo-class).


---

## Page 20

CSS Rules (Pseudo-classes and Pseudo-elements)
•
Pseudo-elements create (like before and after) or style parts of 
elements that don't exist in the DOM (first-line in paragraph and 
selection).
•
They are denoted by double colons (::) in modern CSS (though 
single colon still works)


---

## Page 21

CSS Rules (Multiple Selector)
•
It’s used to style a group of selectors separated by comma
table, th, td {
border: 1px solid black; 
border-collapse: collapse;
}
th, td {
padding: 10px;
}


---

## Page 22

CSS Rules (  selector)
Selector level
• Universal selector: Selects all elements on the page. (use *)
• Nested selector: Selects elements inside another element. (use
space)
• Attribute selector: Selects elements based on attributes or attribute
values. (use [] )


---

## Page 23

CSS Rules (  selector level)
Universal
selector
Apply a box-sizing reset to every element in the 
page
* {
box-sizing: border-box;
margin: 0;
padding: 0;
}
Nested selector
Style only <li> elements inside a 
<nav>
nav ul li {
background-color: lightgray;
padding: 8px;
}
attribute selector
Inputs where type="email" 
input[type="email"] {
background-color: #ffecec;
}
All elements with a 'target' 
attribute 
a[target] {
border: 1px solid blue;
}


---

## Page 24

Responsive 
Design


---

## Page 25

Responsive Design Principles
Three principles of responsive web design
▰Fluid design
o
requires the use of percentages instead of pixels for element widths. The percentage
you specify is the percentage of the available viewport width that you want the element
to occupy. A value of 100% would fill all of the viewport width, 50% would fill half, and
so on.
▰flexible images
o
rather than images being cropped as the viewport width becomes smaller, it would be
better if the whole image got smaller as the viewport width decreased.
▰CSS media queries.
o
Media queries, introduced in CSS3, are used to apply style sheets at certain
breakpoints. These queries can be coded within a style sheet or on a link element in
HTML. Links to style sheets for our breakpoint of 960 pixels could be coded in HTML
as follows:
•
<link rel="stylesheet" media="(max-width:959px)" href="medium.css">
•
<link rel="stylesheet" media="(min-width:960px)" href="large.css">


---

## Page 26

How TO - Responsive Design
▰The text size can be set with a vw unit, which means the "viewport
width".
▰That way the text size will follow the size of the browser window:
•
Viewport is the browser window size.
•
1vw = 1% of viewport width.
•
 If the viewport is 50cm wide, 1vw is 0.5cm.


---

## Page 27

How TO - Responsive Design
▰Change
Font
Size
With
Media
Queries done this way for partial
styling
HTML


---

## Page 28

How TO - Responsive Design
▰Change
Font
Size
With
Media
Queries


---

## Page 29

Commonly used properties


---

## Page 30

•
Background, Coloring, Font
•
Box model,units
•
Position
•
transfrom with methods 
translate(val,val),rotate(deg),scale(x,y),scaleX(val),scaleY(val),ske
wX(deg),skewY(deg),skew(degx,degy),matrix(scalex,skewy,skewx,
scaley,translate,translatey)
•
Transition
•
animation


---

## Page 31

•
background-image: 
•
Use url() function to set the location of the element's background image
•
Or use linear-gradient(to right, red, yellow)
•
background-repeat: 
•
should background image be displayed in a repeating pattern (versus once only) 
•
font, font-family, font-size, font-weight (Thickness(normal,bold,bolder,lighter,or
numeric value in range 100-900)), font-style: (determines slant (normal, italic, oblique))
•
text-align
•
values are center, left, right,justify
•
vertical-align:
•
baseline,text-top,text-bottom,sub,super
•
cursor - Set the cursor when over element (e.g. help) 


---

## Page 32

Colors, Fonts and Sizes


---

## Page 33

text-align Property


---

## Page 34

vertical-align Property
The vertical-align property sets the vertical alignment of an 
element.


---

## Page 35

Some General Properties
Control many style properties of an element:
●Coloring
●Size
●Position
●Visibility
●Many more: (e.g. p: { text-decoration: line-through; })
●Also used in animation


---

## Page 36

Color - Properties: color & background_color
Must ultimately turn into red, green, and blue intensities between 0 and
255:
⮚Predefined names: red, blue, green, white, etc. (140 standard names)
Example: h1: { color: red; }
⮚8-bit hexadecimal numbers for red, green, blue: #ff0000
⮚0-255 decimal intensities: rgb(255,255,0)
⮚Percentage intensities: rgb(80%,80%,100%)


---

## Page 37

Box model


---

## Page 38

Box Model


---

## Page 39

Margin
▰The
margin property defines a margin (space) outside the border.


---

## Page 40

Margins
⮚Margins are used to create space around elements, outside of any defined 
borders.
⮚
has properties for specifying the margin for each side of an element:
✔
margin-top
✔
margin-right
✔
margin-bottom
✔
margin-left
⮚All the margin properties can have the following values:
✔auto - the browser calculates the margin
✔length - specifies a margin in px, pt, cm, etc.
✔% - specifies a margin in % of the width of the containing element


---

## Page 41

Border


---

## Page 42

Padding
▰The
padding property defines a padding (space) between the text
and the border.


---

## Page 43

Padding
⮚The   padding properties are used to generate space around an element's 
content, inside of any defined borders.
⮚
has properties for specifying the padding for each side of an element:
✔
padding-top
✔
padding-right
✔
padding-bottom
✔
padding-left
⮚All the padding properties can have the following values:
✔length - specifies a padding in px, pt, cm, etc.
✔% - specifies a padding in % of the width of the containing element


---

## Page 44

Padding


---

## Page 45

Padding - Shorthand Property
If the padding property has four values
padding: 25px 50px 75px 100px;
top padding is 25px
right padding is 50px
bottom padding is 75px
left padding is 100px


---

## Page 46

Padding - Shorthand Property
If the padding property has four values
padding:25px 50px;
✔top and bottom paddings are 25px
✔right and left paddings are 50px


---

## Page 47

Padding - Shorthand Property
If the padding property has one value
padding:25px ;
✔all four paddings are 25px


---

## Page 48

Size Properties


---

## Page 49

Units in CSS
⮚Absolute units
o
px: pixels, mm: millimeters, 
cm,in,pt:printerpoint
⮚Percentage units
o
% of parent element
⮚Relative unit
o
To font size
•
em,rem: relative to parent front, 
relative to root font
o
To viewport
•
vw, vh : 1/100 of viewport width 
and height repectively


---

## Page 50

Position Property


---

## Page 51

Position 
Property
static
fixed
sticky
relative
absolute


---

## Page 52

Position Property
⮚The position property specifies the type of positioning method used for an 
element.
⮚There are five different position values:
✔
static
✔
relative
✔
fixed
✔
absolute
✔
sticky


---

## Page 53

Position Property


---

## Page 54

position: static;
⮚HTML elements are positioned static by default.
⮚Static positioned elements are not affected by the top, bottom, left, and righ
properties.
⮚An element with position: static; is not positioned in any special way; it is 
always positioned according to the normal flow of the page


---

## Page 55

position: static;


---

## Page 56

position: relative;
An element with position: relative; is positioned relative to its normal 
position.


---

## Page 57

position: fixed;
An element with position: fixed; is positioned relative to the viewport, 
which means it always stays in the same place even if the page is 
scrolled.  


---

## Page 58

position: absolute;
An element with position: absolute; Positioned relative to nearest 
positioned ancestor (non-static) or the document body.


---

## Page 59

position: sticky;
✔An element with position: sticky; is positioned based on the user's scroll 
position.
✔Hybrid of relative and fixed. "Sticks" when crossing a threshold during 
scrolling
✔Note: Internet Explorer does not support sticky positioning. Safari 
requires a -webkit- prefix (see example below).


---

## Page 60

position: sticky;


---

## Page 61

position values comparison


---

## Page 62

Display and visibility properties


---

## Page 63

Element visibility control properties


---

## Page 64

Element visibility control properties
•
display: none; Element is not displayed and takes no space in 
layout. 
•
display: inline; - Element is treated as an inline element. 
•
display: block; - Element is treated as a block element that 
respects box model
•
display: inline-block; - Element is treated as an inline element 
that respects box model. 
•
visibility: hidden; - Element is hidden but space still 
allocated. 
•
visibility: visible; - Element is normally displayed 
•
display: flex; - Element is treated as a flex block 
container.
•
display: flex-inline; - Element is treated as a flex inline 
container. 
•
display: grid; - Element is treated as a grid block 
container. 
•
display: grid-inline; - Element is treated as a grid inline 
container. 


---

## Page 65

display Property
⮚The display property specifies the display behavior (the type of rendering 
box) of an element.


---

## Page 66

display Property


---

## Page 67

display Property
⮚The display property specifies the display behavior (the type of rendering 
box) of an element.


---

## Page 68

display inline Property


---

## Page 69

display block Property


---

## Page 70

display inline-block Property


---

## Page 71

display flex Property


---

## Page 72

display grid Property


---

## Page 73

display inline-grid Property


---

## Page 74

Flexbox and Grid layout Property


---

## Page 75

Flexbox Layout


---

## Page 76

Flex containers and items
There are two places in which you will be assigning flexbox properties: the flex 
container and the flex items within the container.


---

## Page 77

The flexbox container properties


---

## Page 78

The flexbox container properties (ii)


---

## Page 79

The flexbox item (child) properties


---

## Page 80

Flexbox Cards


---

## Page 81

Grid Layout
Grid layout is adjustable, powerful, and, compared to floats, positioning, and 
even flexbox, is relatively easy to learn and use!
•
Each blocklevel child in a parent container whose display property is set to 
grid will be automatically placed into a grid cell


---

## Page 82

Specifying Grid Structure
grid-template-columns is used for adding columns by specifying each column’s 
width using the fr unit.


---

## Page 83

Specifying column widths
Column widths can be specified
The   repeat() function provides a way to specify repeating patterns of columns.


---

## Page 84

Specifying column widths (ii)


---

## Page 85

Explicit Grid Placement Example 1


---

## Page 86

Explicit Grid Placement Example 2


---

## Page 87

Cell properties
•
align-self and justify-self 
control the cell content’s 
horizontal and vertical alignment 
within its grid container.
•
You can similarily control cell alignment within a grid container using align-
items and justify-items


---

## Page 88

Nested Grid
•
align-self and justify-self 
control the cell content’s 
horizontal and vertical alignment 
within its grid container.


---

## Page 89

Grid and Flexbox Together
•
grid and flexbox each have their 
strengths and these strengths can 
be combined
•
grid layout is ideal for constructing 
the layout structure of your page
•
flexbox is ideal for laying out the 
contents of a grid cell.


---

## Page 90

Example(predict the output)


---

## Page 91

Example 2 (predict the output)


---

## Page 92

Transform


---

## Page 93

CSS Transform 
The transform property applies a 2D or 3D transformation to an element.
It allows you to rotate, scale, move, skew, etc., elements.
Common transform functions:
- translate(x, y): Moves the element
- rotate(angle): Rotates the element
- scale(x, y): Scales the element
- skew(x-angle, y-angle): Skews the element
- matrix(): A 2D transformation matrix combining all the above


---

## Page 94

Transition


---

## Page 95

CSS Transitions  
▰They allow you to change property values smoothly over a given duration
▰transition is a shorthand property that combines four sub-properties with the order:
o
transition-property: Which CSS properties to animate (e.g., background-color, transform)
o
transition-duration: How long the transition should take (e.g., 0.3s)
o
transition-timing-function: The animation speed curve (e.g., ease, linear, ease-in, ease-out, ease-in-out)
o
transition-delay: How long to wait before starting (e.g., 0.2s)


---

## Page 96

Animation


---

## Page 97

CSS Animation
▰CSS animations allow you to animate transitions from one CSS style
configuration to another.
▰They consist of two parts:
1. Keyframes: Define the stages and styles of the animation.
2. Animation properties: Assign the keyframes to elements and define how the
animation should behave.


---

## Page 98

CSS Animation
▰Keyframes:
- The `@keyframes` rule specifies the animation code.
- You define keyframes at certain percentages (from 0% to 100%) or with `from`
(0%) and `to` (100%).
- Inside each keyframe, you define the CSS properties you want to animate.
@keyframes color-change {
0% { background-color: black; }
25% { background-color: red; }
50% { background-color: orange; }
75% { background-color: yellow; }
100% { background-color: white; }
-
}


---

## Page 99

CSS Animation
▰Animation Properties:
-`animation-name`: Specifies the name of the keyframe you want to bind to the selector.
- `animation-duration`: How long the animation should take (e.g., 2s).
- `animation-timing-function`: How the animation progresses over time (e.g., ease, linear, ease-in-out).
- `animation-delay`: Delay before the animation starts.
- `animation-iteration-count`: How many times the animation should run (e.g., infinite, 3).
- `animation-direction`: Specifies if the animation should play in reverse on alternate cycles (normal, reverse, 
alternate, alternate-reverse).
- `animation-fill-mode`: Specifies what styles are applied before and after the animation (none, forwards, 
backwards, both).
- `animation-play-state`: Specifies whether the animation is running or paused.


---

## Page 100

CSS Animation
Shorthand:
The `animation` shorthand property can be used to set all the animation properties at once:
animation: [name] [duration] [timing-function] [delay] [iteration-count] [direction] [fill-mode] [play-
state];
Example:
p{
position: fixed;
top:50%;
left: 50%;
animation: color-change 5s ease 1s infinite normal forwards;
}


---

## Page 101

Some other   issues


---

## Page 102

TASK: implement   to login form, contact 
form, signup form 


---

## Page 103

Thank you


---

