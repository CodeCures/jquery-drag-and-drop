 $(function () { 
    let Draggable = {
      props: {
        figures: Object,
        answers: Object,
      },
      template: `
      <template v-for="(figure, i) in figures" :key="figure.id">
        <div class="draggable ui-widget-content" :data-id="answers[i].id">
          {{ answers[i].name }}
        </div>
        <div class="droppable ui-widget-header" :data-id="figure.id">
          <img :src="figure.src" :alt="figure.src" width="100">
        </div>
      </template>
      `
    };

    Vue.createApp({
      components: {
        Draggable
      },
      data() {
        return {
          questions: [
            {
              id: 1,
              src: "https://o.quizlet.com/nlXQ4BZdqTXygB5zG.rQXg_m.jpg",
            },
            {
              id: 2,
              src: "https://farm4.staticflickr.com/3167/2760112757_1f649b4241_m.jpg",
            },
            {
              id: 3,
              src: "https://o.quizlet.com/I16qtRystKGQ8vsX83hs8w_m.jpg",
            },
            {
              id: 4,
              src: "https://o.quizlet.com/Fu7rtRcCQF4QqCBjiyHKBA_m.jpg",
            },
            {
              id: 5,
              src: "https://o.quizlet.com/i/DS_xfT96kfYcjPl-ZXXrMA_m.jpg",
            },
            {
              id: 6,
              src: "https://farm8.staticflickr.com/7372/9211474820_5fb0c2fb5e_m.jpg",
            },
            {
              id: 7,
              src: "https://o.quizlet.com/Xewj3PxfRR0b8AA.2EjU3Q_m.jpg",
            },
            {
              id: 8,
              src: "https://o.quizlet.com/MUJCrnEiXJOXbaPRWDx4cw_m.jpg",
            },
          ],
          answers: [
            {
              id: 1,
              name: "A Bank (Manager)/Accountant"
            },
            {
              id: 2,
              name: "A Pilot",
            },
            {
              id: 3,
              name: "Police Man and Woman",
            },
            {
              id: 4,
              name: "Lawyer",
            },
            {
              id: 5,
              name: "A Nurse",
            },
            {
              id: 6,
              name: "A flight Attendant",
            },
            {
              id: 7,
              name: "A Reporter",
            },
            {
              id: 8,
              name: "A Teacher",
            },
          ]
          
        };
      },
      methods: {
        shuffleArray(array) {
          for (var i = array.length - 1; i > 0; i--) {
            // Generate random number
            var j = Math.floor(Math.random() * (i + 1));

            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
          }
          return array;
        },
        distortArray(array){
          for(let i = 0; i < array.length - 1; i++){
            array[i].name = array[i + 1].name
          }
          return array;
        }
      },
      computed: {
        shuffledFigures(){
          return this.shuffleArray(this.questions);
        },
        shuffledAnswers(){
          return this.shuffleArray(this.answers)
        }
      },
    }).mount("#app");

    $(".draggable").draggable({
      revert: false,
    });
    $(".droppable").droppable({
      drop: function (event, ui) {
        let dragId = ui.draggable[0].getAttribute("data-id");
        let dropID = event.target.getAttribute("data-id");
        if (dropID != dragId) {
          $(".draggable").draggable({
            revert: true,
          });
        } else {
          $(".draggable").draggable({
            revert: false,
          });
          $(
            `.droppable[data-id="${dropID}"], .draggable[data-id="${dragId}"]`
          ).css({
            visibility: "hidden",
          });
        }
        $(this).css({
          border: `1px solid ${dropID == dragId ? "#27ae60" : "#e74c3c"}`,
        });
      },
    });
});