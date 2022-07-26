// Various JSONS for the Quaizapp, depending on the language, are saved in this file.
let questionsHTML = [
    {
        "question": "Wer hat HTML erfunden?",
        "answer1": "Robbie Williams",
        "answer2": "Lady Gaga",
        "answer3": "Tim Berners-Lee",
        "answer4": "Justin Bieber",
        "rightAnswer": 3
    },
    {
        "question": "Was bedeutet das HTML Tag &lt;a&gt;?",
        "answer1": "Text Fett",
        "answer2": "Container",
        "answer3": "Ein Link",
        "answer4": "Kursiv",
        "rightAnswer": 3
    },
    {
        "question": "Wie bindet man eine Webseite in eine Webseite ein?",
        "answer1": "&lt;iframe&gt;, &lt;iframe&gt;, and &lt;iframe&gt;",
        "answer2": "&lt;iframe&gt;",
        "answer3": "&lt;frame&gt;",
        "answer4": "&lt;frameset&gt;",
        "rightAnswer": 2
    },
    {
        "question": "Wie stellt man Text am BESTEN fett dar?",
        "answer1": "&lt;strong&gt;",
        "answer2": "CSS nutzen",
        "answer3": "&lt;bold&gt;",
        "answer4": "&lt;b&gt;",
        "rightAnswer": 1
    },
    {
        "question": "Welches Attribut kan man NICHT für Texrarea verwenden?",
        "answer1": "readonly",
        "answer2": "max",
        "answer3": "from",
        "answer4": "spellcheck",
        "rightAnswer": 1
    },
    {
        "question": "Wie wählst du alle Elemente vom Typ &lt;a&gt; mit dem Attribut title aus?",
        "answer1": "a[title]{...}",
        "answer2": "a > title {...}",
        "answer3": "a.title {...}",
        "answer4": "a=title {...}",
        "rightAnswer": 1
    },
    {
        "question": "Wie definiert man in JavaScript eine Variable?",
        "answer1": "let 100 = rate;",
        "answer2": "100 = let rate;",
        "answer3": "rate = 100;",
        "answer4": "let rate = 100;",
        "rightAnswer": 4
    },
];

let questionsCSS = [
    {
        "question": "Wofür steht CSS?",
        "answer1": "Computer Style Sheet",
        "answer2": "Cascading Style Sheets",
        "answer3": "Color Style Sheet",
        "answer4": "Creative Style Sheet",
        "rightAnswer": 2
    },
    {
        "question": "Mir welchem HTML Befehl wird eine CSS-Datei eingebunden?",
        "answer1": "< stylesheet=style.css>",
        "answer2": "< script scr='style.css'>",
        "answer3": "< meta content='style.css'>",
        "answer4": "< link rel='stylesheet' type='text/css' href='style.css'>",
        "rightAnswer": 4
    },
    {
        "question": "Wie lautet die korrekte CSS-Syntax?",
        "answer1": "body[color{black}]",
        "answer2": "body{color:black}",
        "answer3": "body{color=black}",
        "answer4": "body{color;black}:",
        "rightAnswer": 2
    },
    {
        "question": "Mit welcher CSS-Eigenschaft kann die Textfarbe verändert werden?",
        "answer1": "text-color",
        "answer2": "font-color",
        "answer3": "color",
        "answer4": "tcolor",
        "rightAnswer": 3
    },
    {
        "question": "Mit welcher Eigenschaft kann die Schriftart festgelegt werden?",
        "answer1": "text-style",
        "answer2": "font-family",
        "answer3": "text-family",
        "answer4": "font-style",
        "rightAnswer": 2
    },
    {
        "question": "Wie kannst du auf ein Element mit der id 'text' in CSS zugreifen?",
        "answer1": "#text",
        "answer2": ".text",
        "answer3": ".id='text'",
        "answer4": "*text",
        "rightAnswer": 1
    }
]

let questionsJS = [
    {
        "question": "In welchen HTML Tag wird JavaScript geschrieben?",
        "answer1": "< js >",
        "answer2": "< script >",
        "answer3": "< javascript >",
        "answer4": "< function >",
        "rightAnswer": 2
    },
    {
        "question": "Wie kann über JavaScript der HTML-Content über die ID verändert werden?",
        "answer1": "document.getElementById('text').innerHTML='';",
        "answer2": "document.getElementById('text').innerHTML='';",
        "answer3": "#text.innerHTML='';",
        "answer4": "document.getElement('text').innerHTML='';",
        "rightAnswer": 1
    },
    {
        "question": "Wie kannst du einen 'alert' schreiben?",
        "answer1": "alert: 'text'",
        "answer2": "alert[text]",
        "answer3": "alert('text')",
        "answer4": "showAlert('text')",
        "rightAnswer": 3
    },
    {
        "question": "Wie schreibt man eine If-Abfrage für x ist nicht gleich 7?",
        "answer1": "if (x /= 7)",
        "answer2": "if x =! 7 then",
        "answer3": "if (x < or > 7)",
        "answer4": "if (x != 7)",
        "rightAnswer": 4
    },
    {
        "question": "Wie schreibt man einen JS-Array?",
        "answer1": "myArray = ([HTML], [CSS], [JS])",
        "answer2": "myArray = ['HTML' , 'CSS' , 'JS']",
        "answer3": "myArray = [(1='HTML'),(2='CSS'),(3='JS')]",
        "answer4": "myArray = [HTML, CSS, JS]",
        "rightAnswer": 2
    },
    {
        "question": "Wie kannst du dir die Variable 'Name' über die Konsole ausgeben lassen?",
        "answer1": "console.log(Name)",
        "answer2": "console.log(Name)",
        "answer3": "console.show(Name)",
        "answer4": "console.log('Name')",
        "rightAnswer": 1
    }
]

let questionsPython = [
    {
        "question": "Wie kannst du einer Variable den numerischen Wert 5 zuweisen?",
        "answer1": "number = 5",
        "answer2": "number = int(5)",
        "answer3": "x, y = 5, 5",
        "answer4": "alle Antworten sind richtig",
        "rightAnswer": 4
    },
    {
        "question": "Mit welcher Syntax wird der Output 'Python' realisiert?",
        "answer1": "echo(Python)",
        "answer2": "print('Python')",
        "answer3": "output('Python')",
        "answer4": "plot.Python",
        "rightAnswer": 2
    },
    {
        "question": "Welcher der folgenden Variablen-Namen ist nicht erlaubt?",
        "answer1": "MeineVariable",
        "answer2": "Meine-Variable",
        "answer3": "_Meinevariable",
        "answer4": "Meine_Variable",
        "rightAnswer": 2
    },
    {
        "question": "Wie kannst du dir den Typ (zb. Zahl, string) von einer Variable ausgeben lassen?",
        "answer1": "print(type(x))",
        "answer2": "print(type_x)",
        "answer3": "print(typeOf(x))",
        "answer4": "print((type)(x))",
        "rightAnswer": 1
    },
    {
        "question": "Wie kann eine Funktion in Python definiert werden?",
        "answer1": "function meineFunktion():",
        "answer2": "creat meineFunktion():",
        "answer3": "def meineFunktion():",
        "answer4": "def meineFunktion():",
        "rightAnswer": 3
    },
    {
        "question": "Wie schreibst du eine If-Abfrage in Python?",
        "answer1": "if (x < y):",
        "answer2": "if x < y :",
        "answer3": "if x < y then:",
        "answer4": "if (x < y) then:",
        "rightAnswer": 2
    }
]

/*  Empty JSON template for a question

    {
        "question": "",
        "answer1": "",
        "answer2": "",
        "answer3": "",
        "answer4": ",
        "rightAnswer": 
    }, 
    
*/