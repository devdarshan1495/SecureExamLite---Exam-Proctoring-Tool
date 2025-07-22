// Simple Past Answers JavaScript with Working Filters

document.addEventListener('DOMContentLoaded', function() {
    console.log('Past Answers page loaded');

    // Mock data for demonstration
    const mockSubmissions = [
        { 
            id: 'sub123', 
            studentName: 'Sarah Johnson', 
            examName: 'Advanced Mathematics', 
            examId: 'math101',
            submitTime: '14:30', 
            score: '85%',
            answers: [
                { question: 'What is the derivative of x²?', answer: '2x', status: 'correct' },
                { question: 'Describe the process of photosynthesis.', answer: 'Photosynthesis is the process where plants use sunlight to convert carbon dioxide and water into glucose and oxygen.', status: 'pending' },
                { question: 'What is 5 × 8?', answer: '35', status: 'incorrect' }
            ]
        },
        { 
            id: 'sub456', 
            studentName: 'Michael Chen', 
            examName: 'Physics 101', 
            examId: 'phy101',
            submitTime: '15:00', 
            score: '95%',
            answers: [
                { question: 'What is Newton\'s first law?', answer: 'An object at rest stays at rest unless acted upon by an external force.', status: 'correct' },
                { question: 'What is the speed of light?', answer: 'Approximately 300,000 km/s', status: 'correct' }
            ]
        },
        { 
            id: 'sub789', 
            studentName: 'Emily Davis', 
            examName: 'Computer Science', 
            examId: 'cs101',
            submitTime: '16:00', 
            score: '78%',
            answers: [
                { question: 'What is JavaScript?', answer: 'A programming language primarily used for web development.', status: 'correct' },
                { question: 'Explain the concept of closures in JavaScript.', answer: 'A closure is when a function retains access to variables from its outer scope even after the outer function has returned.', status: 'pending' }
            ]
        },
        { 
            id: 'sub124', 
            studentName: 'John Smith', 
            examName: 'Advanced Mathematics', 
            examId: 'math101',
            submitTime: '14:45', 
            score: '92%',
            answers: [
                { question: 'What is the derivative of x²?', answer: '2x', status: 'correct' }
            ]
        },
        { 
            id: 'sub125', 
            studentName: 'Emma Wilson', 
            examName: 'Computer Science', 
            examId: 'cs101',
            submitTime: '16:30', 
            score: '88%',
            answers: [
                { question: 'What is JavaScript?', answer: 'A scripting language for web development.', status: 'correct' }
            ]
        },
        { 
            id: 'sub126', 
            studentName: 'David Brown', 
            examName: 'Physics 101', 
            examId: 'phy101',
            submitTime: '15:30', 
            score: '76%',
            answers: [
                { question: 'What is Newton\'s first law?', answer: 'Objects in motion stay in motion.', status: 'incorrect' }
            ]
        }
    ];

    const exams = [
        { id: '', name: 'All Exams' },
        { id: 'math101', name: 'Advanced Mathematics' },
        { id: 'phy101', name: 'Physics 101' },
        { id: 'cs101', name: 'Computer Science' }
    ];

    // Get DOM elements
    const filterExamSelect = document.getElementById('filterExam');
    const filterStudentInput = document.getElementById('filterStudent');
    const applyFilterBtn = document.getElementById('applyFilterBtn');
    const submissionList = document.getElementById('submissionList');
    const loadingIndicator = document.getElementById('submissionsLoadingIndicator');
    const noSubmissionsMessage = document.getElementById('noSubmissionsMessage');

    // Initialize exam filter options
    function loadExamOptions() {
        filterExamSelect.innerHTML = '';
        exams.forEach(exam => {
            const option = document.createElement('option');
            option.value = exam.id;
            option.textContent = exam.name;
            filterExamSelect.appendChild(option);
        });
    }

    // Create student item HTML
    function createStudentItem(submission) {
        return `
            <div class="student-item" data-submission-id="${submission.id}">
                <div class="student-header">
                    <div class="student-info">
                        <div class="student-name">${submission.studentName}</div>
                        <div class="exam-details">${submission.examName} - Submitted ${submission.submitTime}</div>
                        <div class="student-score">Score: ${submission.score}</div>
                    </div>
                    <button class="view-answers-btn" onclick="toggleStudentAnswers('${submission.id}')">
                        <span>View Answers</span>
                        <i class="fas fa-chevron-down" id="toggle-${submission.id}"></i>
                    </button>
                </div>
                <div class="student-answers" id="answers-${submission.id}" style="display: none;">
                    <div class="answers-content">
                        ${submission.answers.map(answer => `
                            <div class="question-answer-pair">
                                <div class="question-text">${answer.question}</div>
                                <div class="student-answer">
                                    <span class="answer-text">${answer.answer}</span>
                                    <span class="answer-status ${answer.status}">${getStatusText(answer.status)}</span>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    }

    // Get status text
    function getStatusText(status) {
        switch(status) {
            case 'correct': return 'Correct';
            case 'incorrect': return 'Incorrect';
            case 'pending': return 'Pending Review';
            default: return 'Pending Review';
        }
    }

    // Filter and display submissions
    function displaySubmissions(examFilter = '', studentFilter = '') {
        loadingIndicator.style.display = 'block';
        submissionList.innerHTML = '';
        noSubmissionsMessage.style.display = 'none';

        setTimeout(() => {
            const filteredSubmissions = mockSubmissions.filter(submission => {
                const matchesExam = !examFilter || submission.examId === examFilter;
                const matchesStudent = !studentFilter || 
                    submission.studentName.toLowerCase().includes(studentFilter.toLowerCase()) ||
                    submission.id.toLowerCase().includes(studentFilter.toLowerCase());
                return matchesExam && matchesStudent;
            });

            loadingIndicator.style.display = 'none';

            if (filteredSubmissions.length === 0) {
                noSubmissionsMessage.style.display = 'block';
            } else {
                submissionList.innerHTML = filteredSubmissions.map(createStudentItem).join('');
            }
        }, 300);
    }

    // Toggle student answers
    window.toggleStudentAnswers = function(submissionId) {
        const dropdown = document.getElementById(`answers-${submissionId}`);
        const toggleIcon = document.getElementById(`toggle-${submissionId}`);
        const button = toggleIcon.closest('.view-answers-btn');
        
        if (dropdown.style.display === 'none' || dropdown.style.display === '') {
            dropdown.style.display = 'block';
            toggleIcon.classList.remove('fa-chevron-down');
            toggleIcon.classList.add('fa-chevron-up');
            button.querySelector('span').textContent = 'Hide Answers';
        } else {
            dropdown.style.display = 'none';
            toggleIcon.classList.remove('fa-chevron-up');
            toggleIcon.classList.add('fa-chevron-down');
            button.querySelector('span').textContent = 'View Answers';
        }
    };

    // Event listeners
    applyFilterBtn.addEventListener('click', function() {
        const examFilter = filterExamSelect.value;
        const studentFilter = filterStudentInput.value.trim();
        displaySubmissions(examFilter, studentFilter);
    });

    filterExamSelect.addEventListener('change', function() {
        const examFilter = filterExamSelect.value;
        const studentFilter = filterStudentInput.value.trim();
        displaySubmissions(examFilter, studentFilter);
    });

    // Real-time search with debounce
    let searchTimeout;
    filterStudentInput.addEventListener('input', function() {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            const examFilter = filterExamSelect.value;
            const studentFilter = filterStudentInput.value.trim();
            displaySubmissions(examFilter, studentFilter);
        }, 300);
    });

    // Initialize the page
    loadExamOptions();
    displaySubmissions();
});
