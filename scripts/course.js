const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.',
        technology: [
            'HTML',
            'CSS'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
        technology: [
            'C#'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: false
    }
]

const completedCourses = courses.filter((cse) => cse.completed);
let creds = 0;
completedCourses.forEach((i) => {
    creds += i.credits;
})

// const creds = getCreg(courses);

const certAll = document.querySelector('#certall');
const certCse = document.querySelector('#certcse');
const certWdd = document.querySelector('#certwdd');
const certList = document.querySelector('#wdcert');
// let creds = 0;

const CSE = 'CSE';
const WDD = 'WDD';

function buildLi(lid) {
    // certList.clear();
    certList.replaceChildren()
    let cava = courses;
    let ted = `#cert${lid.toLowerCase()}`;
    if (lid != 'ALL') {
        cava = cava.filter((crs) => crs.subject == lid);
    }
    cava.forEach((i) => {
        let iq = document.createElement('li');
        iq.textContent = `${i.subject}${i.number}`;
        if (i.completed) {
            iq.classList.toggle('comptd')
        }
        certList.appendChild(iq);
    })
    return ted;
}

certAll.addEventListener('click',() => {
    buildLi('ALL');
    if (!certAll.classList.contains('check')) {
        certAll.classList.toggle('check');
    }
    if (certCse.classList.contains('check')) {
        certCse.classList.toggle('check');
    }
    if (certWdd.classList.contains('check')) {
        certWdd.classList.toggle('check');
    }
})

certCse.addEventListener('click',() => {
    buildLi(CSE);
    if (certAll.classList.contains('check')) {
        certAll.classList.toggle('check');
    }
    if (!certCse.classList.contains('check')) {
        certCse.classList.toggle('check');
    }
    if (certWdd.classList.contains('check')) {
        certWdd.classList.toggle('check');
    }
})

certWdd.addEventListener('click', () => {
    buildLi(WDD);
    if (certAll.classList.contains('check')) {
        certAll.classList.toggle('check');
    }
    if (certCse.classList.contains('check')) {
        certCse.classList.toggle('check');
    }
    if (!certWdd.classList.contains('check')) {
        certWdd.classList.toggle('check');
    }
})


// certAll.addEventListener('click', () => {
//     let toad = getCompletedAll();
//     if (!certAll.classList.contains('cselect')) {
//         certAll.classList.add('cselect')
//     };
//     if (certCse.classList.contains('cselect')) {
//         certCse.classList.remove('cselect')
//     };
//     if (certWdd.classList.contains('cselect')) {
//         certWdd.classList.remove('cselect')
//     };
//     certList.innerHTML = toad;
// });

// certCse.addEventListener('click', () => {
//     let toad = getCompletedOne(CSE);
//     if (certAll.classList.contains('cselect')) {
//         certAll.classList.remove('cselect')
//     };
//     if (!certCse.classList.contains('cselect')) {
//         certCse.classList.add('cselect')
//     };
//     if (certWdd.classList.contains('cselect')) {
//         certWdd.classList.remove('cselect')
//     };
//     certList.innerHTML = toad;
// });

// certWdd.addEventListener('click', () => {
//     let toad = getCompletedOne(WDD);
//     toad = '<li>toad</li>'
//     if (certAll.classList.contains('cselect')) {
//         certAll.classList.remove('cselect')
//     };
//     if (certCse.classList.contains('cselect')) {
//         certCse.classList.remove('cselect')
//     };
//     if (!certWdd.classList.contains('cselect')) {
//         certWdd.classList.add('cselect')
//     };
//     certList.innerHTML = toad;
// });


// function getCreg(coses) {
//     let fcrs = coses.filter((crs) => crs.completed);
//     let cd = 0;
//     fcrs.array.forEach(crs => {
//         cd += crs.credits;
//     });
//     return cd;
// };

// function getCompletedOne(cmpid) {
//     let comptSt = courses.filter((crs) => crs.subject == cmpid);
//     let compt = getCompletedCompile(comptSt);
//     return compt;
// }

// function getCompletedAll() {
//     let compt = getCompletedCompile(courses);
//     return compt;
// };

// function getCompletedCompile(sorted) {
//     let compd = '';
//     let sortSet = sorted.map((i) => buildOne(i));
//     sortSet.forEach(crs => {
//         compd += crs;
//     });
//     return compd;
// };

// function buildOne(course) {
//     let res = '<li';
//     if (course.completed) {
//         res += ' class="crcompt"'
//     }
//     res = `${res}>${course.subject}${course.number}</li>`
//     return res;
// };

// creds = 0;
// creds = certAll.classList.contains('olo');
document.getElementById('wccredits').innerHTML = `${creds} credits completed.`;