let options = document.querySelectorAll(".optBtn");

options.forEach(opt => {
    opt.addEventListener("click", processRequest);
});

function processRequest(e) {
    let qid = e.currentTarget.id;
    let query;

    switch (qid) {
        case "Email address": {
            let emailRegex = [/^([a-zA-Z0-9_\.-]+)@([a-zA-Z0-9_\.-]+).([a-zA-z]{1,6})[^\.]$/];

            query = prompt("Enter a text to see if it is a valid Email address");
            matchQuery(emailRegex, query, qid);
            break;
        }
        case "Phone number": {
            let phoneRegex = [/^((\+)?(88)?)?01([0-9]{9})$/];

            query = prompt("Enter a text to see if it is a valid Bangladeshi Phone Number");
            matchQuery(phoneRegex, query, qid);
            break;
        }
        case "Date": {
            let ddmmyy = /^(0?[1-9]|[12][1-9]|3[01])[- /\.](0?[1-9]|1[012])[- /\.]([0-9]{2})?[0-9]{2}$/;
            let yymmdd = /^([0-9]{2})?[0-9]{2}[- /\.](0?[1-9]|1[012])[- /\.](0?[1-9]|[12][1-9]|3[01])$/;
            let mmddyy = /^(0?[1-9]|1[012])[- /\.](0?[1-9]|[12][1-9]|3[01])[- /\.]([0-9]{2})?[0-9]{2}$/;
            let dateRegex = [ddmmyy, yymmdd, mmddyy];

            query = prompt("Enter a text to see if it is a valid Date");
            matchQuery(dateRegex, query, qid);
            break;
        }
        default: {
            showMsg("Invalid option", "warning");
        }
    }
}

function matchQuery(regex, query, qid) {
    let msgstr = `"${query}" is a valid ${qid}`;

    let match;
    regex.forEach(re => {
        if (re.test(query)) {
            match = true;
        } else {
            match = match || false;
        }
    });

    if (match) {
        showMsg(msgstr, "success");
    } else {
        showMsg(`"${query}" is not a valid ${qid}`, "error");
    }

}

function showMsg(msg, type) {
    let outArea = document.querySelector("#outputarea");

    outArea.innerHTML = `
        <h4 class="${type} p-5 ml-5">${msg}</h4>
    `;
}