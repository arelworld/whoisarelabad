document.addEventListener('DOMContentLoaded', function() {
    // Music Player Functionality
    const playPauseBtn = document.querySelector('.play-pause');
    const progressBar = document.querySelector('.progress');
    const progressHandle = document.querySelector('.progress-handle');
    const progressContainer = document.querySelector('.progress-bar');
    const currentTimeEl = document.querySelector('.progress-time:first-child');
    const totalTimeEl = document.querySelector('.progress-time:last-child');
    const volumeLevel = document.querySelector('.volume-level');
    const volumeBar = document.querySelector('.volume-bar');
    const heartBtn = document.querySelector('.heart-button');

    let isPlaying = false;
    let currentTime = 83;
    let totalTime = 206;
    
    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }
    
    currentTimeEl.textContent = formatTime(currentTime);
    totalTimeEl.textContent = formatTime(totalTime);
    
    playPauseBtn.addEventListener('click', function() {
        isPlaying = !isPlaying;
        
        if (isPlaying) {
            playPauseBtn.classList.remove('fa-play-circle');
            playPauseBtn.classList.add('fa-pause-circle');
            simulatePlayback();
        } else {
            playPauseBtn.classList.remove('fa-pause-circle');
            playPauseBtn.classList.add('fa-play-circle');
        }
    });
    
    function simulatePlayback() {
        if (!isPlaying) return;
        
        if (currentTime < totalTime) {
            currentTime += 1;
            updateProgressBar();
            currentTimeEl.textContent = formatTime(currentTime);
            setTimeout(simulatePlayback, 1000);
        } else {
            isPlaying = false;
            playPauseBtn.classList.remove('fa-pause-circle');
            playPauseBtn.classList.add('fa-play-circle');
            currentTime = 0;
            updateProgressBar();
            currentTimeEl.textContent = formatTime(currentTime);
        }
    }
    
    function updateProgressBar() {
        const progressPercent = (currentTime / totalTime) * 100;
        progressBar.style.width = `${progressPercent}%`;
        progressHandle.style.left = `${progressPercent}%`;
    }
    
    progressContainer.addEventListener('click', function(e) {
        if (!isPlaying) return;
        
        const rect = this.getBoundingClientRect();
        const clickPosition = (e.clientX - rect.left) / rect.width;
        currentTime = clickPosition * totalTime;
        
        updateProgressBar();
        currentTimeEl.textContent = formatTime(currentTime);
    });
    
    volumeBar.addEventListener('click', function(e) {
        const rect = this.getBoundingClientRect();
        const clickPosition = (e.clientX - rect.left) / rect.width;
        volumeLevel.style.width = `${clickPosition * 100}%`;
    });

    heartBtn.addEventListener('click', function() {
        this.classList.toggle('active');
    });

    updateProgressBar();

    // Skills Carousel
    document.querySelectorAll('.skills-carousel').forEach(carousel => {
        const track = carousel.querySelector('.carousel-track');
        carousel.querySelector('.prev').addEventListener('click', () => {
            track.scrollBy({ left: -200, behavior: 'smooth' });
        });
        carousel.querySelector('.next').addEventListener('click', () => {
            track.scrollBy({ left: 200, behavior: 'smooth' });
        });
    });

    // Dropdown Menu
    const userInfo = document.querySelector('.user-info');
    if (userInfo) {
        userInfo.addEventListener('click', function(e) {
            e.stopPropagation();
            const dropdown = this.querySelector('.dropdown-menu');
            dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
        });

        document.addEventListener('click', function() {
            const dropdown = document.querySelector('.dropdown-menu');
            if (dropdown) dropdown.style.display = 'none';
        });
    }

    // Accordion Toggle
    document.querySelectorAll('.accordion').forEach(acc => {
        acc.addEventListener('click', function() {
            this.classList.toggle('active');
            const panel = this.nextElementSibling;
            if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
            } else {
                panel.style.maxHeight = panel.scrollHeight + "px";
            }
        });
    });

    // Navigation and Library Functionality
    const sidebarLinks = document.querySelectorAll('.sidebar .nav-item a');
    const navItems = document.querySelectorAll('.sidebar .nav-item');
    const sections = document.querySelectorAll('.content-section');
    const mainContent = document.getElementById('main-content');

    // Library functionality
    // Library functionality with folder system
// Library functionality with folder system
const libraryNavItem = document.querySelector('.nav-item[data-page="library"]');

if (libraryNavItem) {
    libraryNavItem.addEventListener('click', function(e) {
        e.preventDefault();
        showLibraryPage();
    });
}

function showLibraryPage() {
    // Hide all regular content sections
    sections.forEach(section => {
        if (section.id !== 'library-content') {
            section.style.display = 'none';
        }
    });

    // Create or show library content
    let librarySection = document.getElementById('library-content');
    
    if (!librarySection) {
        librarySection = document.createElement('div');
        librarySection.id = 'library-content';
        librarySection.className = 'content-section';
        librarySection.innerHTML = `
            <h2><i class="fas fa-book-open"></i> MY WORK PORTFOLIO</h2>
           
            
            <!-- Hidden Admin Toggle Button -->
            <button class="admin-toggle" id="adminToggle" title="Admin Panel">
                
            </button>

            <!-- Hidden Admin Panel -->
            <div class="admin-panel" id="adminPanel">
                <h3><i class="fas fa-upload"></i> Add New Project Proof</h3>
                <form class="upload-form" id="uploadForm">
                    <div class="form-group">
                        <label for="projectTitle">Project Title</label>
                        <input type="text" id="projectTitle" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="projectType">Project Category</label>
                        <select id="projectType" required>
                            <option value="">Select Category</option>
                            <option value="web">Web Development</option>
                            <option value="database">Database Management</option>
                            <option value="linux">Linux/Server Setup</option>
                            <option value="design">UI/UX Design</option>
                            <option value="mobile">Mobile Development</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label for="projectDescription">Description</label>
                        <textarea id="projectDescription" placeholder="Describe the project and your role..."></textarea>
                    </div>
                    
                    <div class="form-group">
                        <label for="projectTechnologies">Technologies Used</label>
                        <input type="text" id="projectTechnologies" placeholder="HTML, CSS, JavaScript, PHP...">
                    </div>
                    
                    <div class="form-group">
                        <label for="projectLink">Project Link (URL)</label>
                        <input type="url" id="projectLink" placeholder="https://example.com">
                    </div>
                    
                    <div class="form-group">
                        <label for="projectImage">Upload Image/Proof</label>
                        <input type="file" id="projectImage" accept="image/*,.pdf,.doc,.docx">
                    </div>
                    
                    <button type="submit" class="submit-btn">
                        <i class="fas fa-plus"></i> Add Project
                    </button>
                </form>
            </div>

            <!-- Categories/Folders View -->
            <div class="categories-grid" id="categoriesContainer">
                <!-- Categories will be dynamically added here -->
            </div>

            <!-- Projects Grid View (hidden by default) -->
            <div class="projects-grid" id="projectsGrid">
                <div class="projects-header">
                    <button class="back-to-folders" id="backToFolders">
                        <i class="fas fa-arrow-left"></i> Back to Categories
                    </button>
                    <h3 id="currentCategoryTitle">Projects</h3>
                </div>
                <div class="projects-container" id="projectsContainer">
                    <!-- Projects will be dynamically added here when category is clicked -->
                </div>
            </div>
        `;
        mainContent.appendChild(librarySection);
        
        // Initialize functionality
        initializeLibraryFunctionality();
        // Load categories
        loadCategories();
    }

    // Show library section
    librarySection.style.display = 'block';
    
    // Update active nav item
    navItems.forEach(item => item.classList.remove('active'));
    if (libraryNavItem) libraryNavItem.classList.add('active');

    // Remove blur from all sections
    sections.forEach(sec => sec.classList.remove('blurred'));
    
    // Scroll to top of library section
    librarySection.scrollIntoView({ behavior: 'smooth' });
}

function handleNavigationClick(e) {
    const targetId = this.getAttribute('href').substring(1);
    
    if (targetId === "main-content") {
        // Show all regular sections for home
        sections.forEach(sec => {
            sec.style.display = 'block';
            sec.classList.remove('blurred');
        });
        // Hide special sections (library and about me)
        const librarySection = document.getElementById('library-content');
        const aboutMeSection = document.getElementById('about-me-content');
        if (librarySection) librarySection.style.display = 'none';
        if (aboutMeSection) aboutMeSection.style.display = 'none';
        
        // Update active nav item
        navItems.forEach(item => item.classList.remove('active'));
        const homeItem = document.querySelector('.nav-item a[href="#main-content"]').closest('.nav-item');
        if (homeItem) homeItem.classList.add('active');
        
        return;
    }

    if (targetId === "library" || targetId === "about-me") {
        // These are handled by their specific functions, do nothing here
        return;
    }

    // Handle regular portfolio sections (Skills, Experience, Education, etc.)
    e.preventDefault();
    
    // Show all regular sections and hide special sections
    sections.forEach(sec => sec.style.display = 'block');
    const librarySection = document.getElementById('library-content');
    const aboutMeSection = document.getElementById('about-me-content');
    if (librarySection) librarySection.style.display = 'none';
    if (aboutMeSection) aboutMeSection.style.display = 'none';

    // Blur functionality
    const targetSection = document.getElementById(targetId);
    sections.forEach(sec => sec.classList.remove('blurred'));
    sections.forEach(sec => {
        if (sec !== targetSection) {
            sec.classList.add('blurred');
        }
    });

    // Update active nav item
    navItems.forEach(item => item.classList.remove('active'));
    const activeItem = this.closest('.nav-item');
    if (activeItem) activeItem.classList.add('active');

    if (targetSection) {

        targetSection.scrollIntoView({ behavior: 'smooth' });
    }

    setTimeout(() => {
        sections.forEach(sec => sec.classList.remove('blurred'));
    }, 5000);
}

function initializeLibraryFunctionality() {
    const adminToggle = document.getElementById('adminToggle');
    const adminPanel = document.getElementById('adminPanel');
    const uploadForm = document.getElementById('uploadForm');
    const backToFolders = document.getElementById('backToFolders');

    if (!adminToggle || !adminPanel || !uploadForm || !backToFolders) return;

    // Toggle admin panel with secret key (Ctrl+Shift+L)
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.shiftKey && e.key === 'L') {
            adminPanel.classList.toggle('visible');
        }
    });

    // Button toggle
    adminToggle.addEventListener('click', function() {
        adminPanel.classList.toggle('visible');
    });

    // Handle form submission
    uploadForm.addEventListener('submit', function(e) {
        e.preventDefault();
        addNewProject();
    });

    // Back to folders button
    backToFolders.addEventListener('click', function() {
        showCategoriesView();
    });
}

function showCategoriesView() {
    document.getElementById('categoriesContainer').style.display = 'grid';
    document.getElementById('projectsGrid').style.display = 'none';
}

function showProjectsView(category) {
    document.getElementById('categoriesContainer').style.display = 'none';
    document.getElementById('projectsGrid').style.display = 'block';
    
    const categoryTitle = document.getElementById('currentCategoryTitle');
    const projectsContainer = document.getElementById('projectsContainer');
    
    categoryTitle.textContent = `${category.name} Projects`;
    projectsContainer.innerHTML = '';
    
    const projects = JSON.parse(localStorage.getItem('portfolioProjects') || '[]');
    const categoryProjects = projects.filter(project => project.type === category.id);
    
    if (categoryProjects.length === 0) {
        projectsContainer.innerHTML = '<p class="no-projects">No projects in this category yet.</p>';
        return;
    }
    
    categoryProjects.forEach(project => {
        addProjectToDisplay(project, projectsContainer);
    });
}

function loadCategories() {
    const categoriesContainer = document.getElementById('categoriesContainer');
    if (!categoriesContainer) return;
    
    categoriesContainer.innerHTML = '';
    
    const categories = [
        { id: 'web', name: 'Web Development', icon: 'fas fa-laptop-code', color: 'category-web' },
        { id: 'design', name: 'Graphic Design', icon: 'fas fa-palette', color: 'category-design' },
        { id: 'blog', name: 'Blog', icon: 'fas fa-pen-nib', color: 'category-blog' },
        { id: 'other', name: 'Others', icon: 'fas fa-folder', color: 'category-other' }
    ];
    
    const projects = JSON.parse(localStorage.getItem('portfolioProjects') || '[]');
    
    categories.forEach(category => {
        const categoryProjects = projects.filter(project => project.type === category.id);
        const categoryElement = document.createElement('div');
        categoryElement.className = `category-folder ${category.color}`;
        categoryElement.innerHTML = `
            <div>
                <div class="folder-header">
                    <i class="folder-icon ${category.icon}"></i>
                    <div class="folder-info">
                        <h3>${category.name}</h3>
                        <span class="project-count">${categoryProjects.length} projects</span>
                    </div>
                </div>
                <div class="folder-preview">
                    ${generateFolderPreview(categoryProjects)}
                </div>
            </div>
        `;
        
        categoryElement.addEventListener('click', () => {
            showProjectsView(category);
        });
        
        categoriesContainer.appendChild(categoryElement);
    });
}


function generateFolderPreview(projects) {
    return ""; // no previews at all
}



function addNewProject() {
    const title = document.getElementById('projectTitle').value;
    const type = document.getElementById('projectType').value;
    const description = document.getElementById('projectDescription').value;
    const technologies = document.getElementById('projectTechnologies').value;
    const link = document.getElementById('projectLink').value;
    const imageFile = document.getElementById('projectImage').files[0];

    if (!title || !type) {
        alert('Please fill in required fields');
        return;
    }

    const project = {
        id: Date.now(),
        title,
        type,
        description,
        technologies,
        link,
        image: imageFile ? URL.createObjectURL(imageFile) : null,
        date: new Date().toLocaleDateString()
    };

    // Save to localStorage
    saveProject(project);
    // Reload categories to update counts and previews
    loadCategories();
    // Reset form
    document.getElementById('uploadForm').reset();
    
    alert('Project added successfully!');
}

function saveProject(project) {
    const projects = JSON.parse(localStorage.getItem('portfolioProjects') || '[]');
    projects.push(project);
    localStorage.setItem('portfolioProjects', JSON.stringify(projects));
}

function addProjectToDisplay(project, container) {
    const typeConfig = {
        'web': { icon: 'fas fa-laptop-code', name: 'Web Development' },
        'database': { icon: 'fas fa-database', name: 'Database' },
        'linux': { icon: 'fab fa-linux', name: 'Linux/Server' },
        'design': { icon: 'fas fa-palette', name: 'UI/UX Design' },
        'mobile': { icon: 'fas fa-mobile-alt', name: 'Mobile App' },
        'other': { icon: 'fas fa-folder', name: 'Other' }
    };

    const config = typeConfig[project.type] || typeConfig.other;

    const projectCard = document.createElement('div');
    projectCard.className = 'project-card';
    projectCard.innerHTML = `
        <div class="project-preview">
            ${project.image ? 
                `<img src="${project.image}" alt="${project.title}">` : 
                `<i class="${config.icon}"></i>`
            }
        </div>
        <div class="project-info">
            <h4>${project.title}</h4>
            ${project.description ? `<p>${project.description}</p>` : ''}
            ${project.technologies ? `<p><strong>Tech:</strong> ${project.technologies}</p>` : ''}
            <p><strong>Added:</strong> ${project.date}</p>
            <div class="project-actions">
                ${project.link ? `
                    <button class="view-btn" onclick="window.open('${project.link}', '_blank')">
                        <i class="fas fa-external-link-alt"></i> View
                    </button>
                ` : `
                    <button class="view-btn" onclick="viewProjectDetails(${project.id})">
                        <i class="fas fa-eye"></i> Details
                    </button>
                `}
            </div>
        </div>
    `;
    container.appendChild(projectCard);
}

// Project details viewer
window.viewProjectDetails = function(projectId) {
    const projects = JSON.parse(localStorage.getItem('portfolioProjects') || '[]');
    const project = projects.find(p => p.id === projectId);
    
    const typeConfig = {
        'web': { name: 'Web Development' },
        'database': { name: 'Database' },
        'linux': { name: 'Linux/Server' },
        'design': { name: 'UI/UX Design' },
        'mobile': { name: 'Mobile App' },
        'other': { name: 'Other' }
    };
    
    if (project) {
        const details = `
Project: ${project.title}
Type: ${typeConfig[project.type]?.name || 'Other'}
Date: ${project.date}
${project.description ? `Description: ${project.description}` : ''}
${project.technologies ? `Technologies: ${project.technologies}` : ''}
${project.link ? `Link: ${project.link}` : ''}
        `;
        alert(details);
    }
};

// Update the sidebar navigation event listeners
sidebarLinks.forEach(link => {
    link.addEventListener('click', handleNavigationClick);
});  // Close the DOMContentLoaded event listener


// About Me functionality
const aboutMeNavItem = document.querySelector('.nav-item[data-page="about-me"]');

if (aboutMeNavItem) {
    aboutMeNavItem.addEventListener('click', function(e) {
        e.preventDefault();
        showAboutMePage();
    });
}

function showAboutMePage() {
    // Hide all regular content sections
    sections.forEach(section => {
        section.style.display = 'none';
    });

    // Create or show about me content
    let aboutMeSection = document.getElementById('about-me-content');
    
   if (!aboutMeSection) {
        aboutMeSection = document.createElement('div');
        aboutMeSection.id = 'about-me-content';
        aboutMeSection.className = 'content-section';
        aboutMeSection.innerHTML = `
            <h2><i class="fas fa-user"></i> ABOUT ME</h2>
<p>Get to know me beyond my professional skills</p>

<div class="about-me-grid">
    <!-- Personality -->
    <div class="personal-card">
        <div class="personal-category">
            <i class="fas fa-brain"></i>
            <h3>Personality</h3>
        </div>
        <ul class="personal-list">
            <li>
                <i class="fas fa-star"></i>
                <strong>MBTI:</strong> 
                <span class="mbti-badge">INFP-T</span>
            </li>
            <li>
                <i class="fas fa-moon"></i>
                <strong>Zodiac:</strong> 
                <span class="zodiac-badge">Leo ♌</span>
            </li>
            <li>
                <i class="fas fa-dragon"></i>
                <strong>Chinese Zodiac:</strong> 
                <span class="zodiac-badge">Year of the Snake 🐍</span>
            </li>
        </ul>
    </div>

    <!-- Favorites -->
    <div class="personal-card">
        <div class="personal-category">
            <i class="fas fa-heart"></i>
            <h3>Favorites</h3>
        </div>
        <div class="favorites-grid">
            <div class="favorite-item">
                <i class="fas fa-music"></i>
                <strong>Music</strong>
                <span>Pop Punk, Alt Rock, Mellow, K-pop, Indie</span>
            </div>
            <div class="favorite-item">
                <i class="fas fa-film"></i>
                <strong>Movies</strong>
                <span>K-drama, Romcom, Thriller, Psycho</span>
            </div>
            <div class="favorite-item">
                <i class="fas fa-book"></i>
                <strong>Books</strong>
                <span>Japanese Lit, Self-help</span>
            </div>
            <div class="favorite-item">
                <i class="fas fa-utensils"></i>
                <strong>Food</strong>
                <span>Siomai, Carbonara, Fries, Sushi, Coffee</span>
            </div>
        </div>
    </div>

    <!-- Hobbies & Interests -->
    <div class="personal-card">
        <div class="personal-category">
            <i class="fas fa-hiking"></i>
            <h3>Hobbies & Interests</h3>
        </div>
        <ul class="personal-list">
            <li><i class="fas fa-book"></i> Journaling</li>
            <li><i class="fas fa-tv"></i> Watching Movies/Series</li>
            <li><i class="fas fa-user-friends"></i> Hanging Out with Friends</li>
        </ul>
    </div>

    <!-- Values & Philosophy -->
    <div class="personal-card">
        <div class="personal-category">
            <i class="fas fa-lightbulb"></i>
            <h3>Values & Philosophy</h3>
        </div>
        <ul class="personal-list">
            <li><i class="fas fa-users"></i> Collaborative Growth</li>
            <li><i class="fas fa-balance-scale"></i> Work-Life Balance</li>
            <li><i class="fas fa-recycle"></i> Continuous Learning</li>
            <li><i class="fas fa-handshake"></i> Authentic Connections</li>
           
        </ul>
    </div>
</div>

        `;
        mainContent.appendChild(aboutMeSection);
    }


   // Show about me section and hide others
    aboutMeSection.style.display = 'block';
    
    // Also hide the library section if it exists
    const librarySection = document.getElementById('library-content');
    if (librarySection) {
        librarySection.style.display = 'none';
    }
    
    // Update active nav item
    navItems.forEach(item => item.classList.remove('active'));
    if (aboutMeNavItem) aboutMeNavItem.classList.add('active');

    // Remove blur from all sections
    sections.forEach(sec => sec.classList.remove('blurred'));
    
    // Scroll to top
    aboutMeSection.scrollIntoView({ behavior: 'smooth' });
}
});

// Sidebar Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
    const sidebar = document.querySelector('.sidebar');
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    const mainContent = document.querySelector('.main-content');
    
    // Toggle sidebar visibility
    function toggleSidebar() {
        sidebar.classList.toggle('collapsed');
        mainContent.classList.toggle('sidebar-collapsed');
        
        // Save state to localStorage
        const isCollapsed = sidebar.classList.contains('collapsed');
        localStorage.setItem('sidebarCollapsed', isCollapsed);
    }
    
    // Initialize sidebar state from localStorage
    function initializeSidebar() {
        const isCollapsed = localStorage.getItem('sidebarCollapsed') === 'true';
        if (isCollapsed) {
            sidebar.classList.add('collapsed');
            mainContent.classList.add('sidebar-collapsed');
        }
    }
    
    // Event listeners
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', toggleSidebar);
    }
    
    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', function(event) {
        if (window.innerWidth <= 768 && 
            !sidebar.contains(event.target) && 
            !sidebarToggle.contains(event.target) && 
            !sidebar.classList.contains('collapsed')) {
            toggleSidebar();
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            sidebar.classList.remove('active');
        }
    });
    
    // Initialize
    initializeSidebar();
});
