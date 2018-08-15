/* STUDENT APPLICATION */
/*
 * Model / data
 */
var model = {
    // Set an object's characteristics
    totDays: 12,
    names: ['Slappy the Frog',
            'Lilly the Lizard',
            'Paulrus the Walrus',
            'Gregory the Goat',
            'Adam the Anaconda'],
    // Array of cat objects with their properties
    students: []
};

/*
 * Octopus: connecting the Model with the View
 */
var octopus = {

    init: function() {
        // Create the students
        for (let i = 0; i < model.names.length; i++){
            let student = {
                studentName: model.names[i],
                days: [],
                missedDays: 0}
            model.students.push(student);
            for (let j = 0; j < model.totDays; j++)
                model.students[i].days.push(false);
        }
        // Initialize the view
        view.init();
    },

    getStudents: function() {
        return model.students;
    },

    getDays: function() {
        return model.totDays;
    },

    toggleAttendanceValue: function(student, day) {
        model.students[student].days[day] = !model.students[student].days[day];
    },

    calculateAddendace: function(student) {
        model.students[student].missedDays = 0;
        model.students[student].days.forEach(function(day){
            if (day === false)
                model.students[student].missedDays++;
        });

        return model.students[student].missedDays;
    }
};

/*
 * View
 */
var view = {

    // Initialize this view
    init: function() {
        this.table = document.getElementsByTagName('tbody')[0];
        this.render();
    },

    updateAddendace: function(student) {
        let element = document.getElementsByClassName('missed-col')[student+1];

        element.textContent = octopus.calculateAddendace(student);
    },

    render: function() {
        while (this.table.hasChildNodes()) {
            this.table.removeChild(this.table.lastChild);
        }

        // Create a document-fragment to enhance reflow-repaint ops
        const fragment = document.createDocumentFragment();
        // Get the cats object array from the model through the octopus
        const students = octopus.getStudents();

        for (let i = 0; i < students.length; i++) {
            // Create new 'tr' element
            const newElement = document.createElement('tr');

            // Set initial attributes and content for the new 'tr'
            newElement.classList.add('student');
            newElement.innerHTML = `<td class="name-col">${students[i].studentName}</td>`;
            // Add new 'td' and 'input' child elements (as many as 'totDays')
            for (let j = 0; j < students[i].days.length; j++) {
                newElement.innerHTML += `<td class="attend-col"><input type="checkbox"></td>`;
            };
            
            // Calculate the missed days for the student
            octopus.calculateAddendace(i);
            
            // Add the last 'td' child element for the total missed days
            newElement.innerHTML += `<td class="missed-col">${students[i].missedDays}</td>`;

            // Add event listener to each 'check-box input'
            for (let j = 0; j < students[i].days.length; j++) {
                let newInput = newElement.getElementsByTagName('input')[j];
                // Add event listener to the new 'input' with
                // closure-in-a-loop that returns the necessary actions
                newInput.addEventListener('click',(function(i, j) {
                    return function() {
                        octopus.toggleAttendanceValue(i,j);
                        view.updateAddendace(i);
                    }
                })(i, j));
            };
            
            // Appent new 'tr' to the document-fragment
            fragment.appendChild(newElement);
        }

        // Appent the document-fragment to the ul, reflow, and repaint
        this.table.appendChild(fragment);
    }
};


// Lunch the app!
octopus.init();


/* STUDENTS IGNORE THIS FUNCTION
 * All this does is create an initial
 * attendance record if one is not found
 * within localStorage.
 */
// (function() {
//     if (!localStorage.attendance) {
//         console.log('Creating attendance records...');
//         function getRandom() {
//             return (Math.random() >= 0.5);
//         }

//         var nameColumns = $('tbody .name-col'),
//             attendance = {};

//         nameColumns.each(function() {
//             var name = this.innerText;
//             attendance[name] = [];

//             for (var i = 0; i <= 11; i++) {
//                 attendance[name].push(getRandom());
//             }
//         });

//         localStorage.attendance = JSON.stringify(attendance);
//     }
// }());