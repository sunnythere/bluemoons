import React from 'react'

export default (props) => {

  return (
        <div id="div_book">
        About

        <p>Blue Moons 2 is based upon an artist book created many years ago in college, in which I examined the concept of language as symbolism by reading text as music.</p>

        <div className="pic">
            <img src="/img/00.jpg" className="bookpic" />
        </div>
        <div className="pic">
            <img src="/img/01.jpg" className="bookpic" />
        </div>

        <p>The original text in my book was created through a game of verbal Exquisite Corpses, initiated by passing two people the beginning of one sentence ("Blue moons are so very...").  They were asked to finish the sentence and start the beginning of the next sentence.  Their sentence fragments were then passed on to the next two participants to finish/start sentences, and so on, so that the story as a whole was hidden to everyone but the artist. </p>

          <div className="pic">
            <img src="/img/02.jpg" className="bookpic" />
          </div>

          <p>The musical translation was straightforward: letters A through G were read as their corresonding pitch, but in a random octave, each letter a sixteenth note. Non-note letters following within the same word acted to increase note duration.  Spaces started rests, increased with any non-note at the beginning of the next word.</p>

          <div className="pic">
            <img src="/img/03.jpg" className="bookpic" />
          </div>

          <p>Finally, the score was played electronically and recorded.</p>

          <p>In the end, an esoteric, dueling two-pronged musical narrative was created.  (The sprinkle of footnotes within are contributions which were received past the given deadlines.)</p>




          <div className="pic">
            <img src="/img/04.jpg" className="bookpic"  />
          </div>

          <p>The tech prototype of this project was built over three-ish days during FS' "Stackathon", using Tone.js and React. It features just a large text field through which the user inputs words, and the appearance of marked letters and tones upon hitting the return key. The spartan, light-colored face of the webpage is meant to emulate the blank page of a book.  Discrete option panels allow the user to change beats per minute or the 'voice' of the tonal playback.</p>

          <div className="pic">
            <img src="/img/05.jpg" className="bookpic" />
          </div>

          <p>This is still a work in progress-- I would love to eventually be able to incorporate the collaborative aspect of the original work, and to refine/vary the visual representation of the music.</p>




        </div>
         )

}
