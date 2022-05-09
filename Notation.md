# Notation

I intend to support various different notations since I intend to support various different ways of writing music. These should all be interchangeable be relatively easy to convert between one another.

### On-score notation

This is the most common notation that you'll see used for classically trained musicians. It's a graphical editor that resembles an empty staff of music and users can add notes by clicking on the staff and selecting the duration of the note. One thing to note is that this is the easiest way of converting the sheet music notation data to transport data. 

From the available libraries, it seems like I am probably going to go for VexFlow but I still want to take a look at the available options in case there's one that acutally supports writing music, not just displaying it.


### Grid notation

This is the notation you'll see on midi tracks usually. It's also the preferred way of writing music for beginners since they wouldn't know theory concepts like key signatures so we want to be able to abstract away the key signature and just write the notes.

First iteration:

[
    [1, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 0, [1, 0], [0, 1]],
    [0, 0, [0, 1], [1, 0]],
]


Where each column is a beatmap of when a note should be played and each row is the key. There are two main issues with this: first - there is a ton of redundant data - a completely empty sheet of music is the same size as completely full and it gets much longer as subdivisions are added in. Secondly - the solution to have notes that last longer than their subdivision requires a huge amount of engineering, hinting that we should probably look for a different solution. Running this solution as a proof of concept worked fine but introduced obvious heating issues on a laptop using multiple tracks.

Next iteration:

Things we want to consider being able to do: glissandos, legatos/slurs, staccato

How to implement: Have properties for groups

{
    1: {
        1: {
            "beat": "1:1:0",
            "notes": [{"C4": "4n"}]                   
        },
        3: ["0:0:0", ["E3" , "8n" ]],
    },
    4: {

    }
}

Constraints:

notes < 120
measures < 90
bpmeasure < 12


[
    
]


[x, y] => where in the transport => beat, note
