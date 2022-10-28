const bodyRef = document.querySelector('body');
const darkThemeFooter = document.querySelector('.footer')
const darkTheme = document.querySelector('.theme-switch-toggle');

if (localStorage.getItem('darkMode') === null) {
    localStorage.setItem('darkMode', "false");
};

checkDarkModeStatus();

function checkDarkModeStatus() {
    if (localStorage.getItem('darkMode') === "true"){
        darkTheme.checked = true;  
        bodyRef.classList.add('dark');            
    } else{
        darkTheme.checked = false; 
        bodyRef.classList.remove('dark');
    };
};

function changeStatus(){                                            
    if (localStorage.getItem('darkMode') === "true"){                 
        localStorage.setItem('darkMode', "false");   
        bodyRef.classList.remove('dark');
    } else{
        localStorage.setItem('darkMode', "true"); 
        bodyRef.classList.add('dark'); 
    };
};