var  nodemailer = require('nodemailer')
exports.send = (rec) => {
    transporter = nodemailer.createTransport({
        service: 'gmail',
        secure: true,
        auth: {
            user: 'nodyTic@gmail.com',
            pass: '@Aristide55'
        }
    });

    var mailOptions = {
        from: 'nodyTic@gmail.com',
        to: rec.mail,
        subject: 'INSCRIPTION - CLUB INFORMATIQUE ESATIC',
        html: `
        <h1>INSCRIPTION - CLUB INFORMATIQUE ESATIC 2019 - 2020</h1>
        <p>Félicitations <b>${rec.nom} ${rec.prenoms}</b> pour votre inscription au club informatique en tant que <b>${rec.type} ${rec.domaineFormation.niveau} en ${rec.domaineFormation.nom}</b>.</p>
        <p>Les dates des differents tests vous seront communiquées <b style="color:red">ultérieurement.</b></p>

        <p>Pour plus d'informations, nos contacts sont les suivants : </p>
        <p>Tel : <b>+225 51 886 478</b></p>
        <p>Mail : <b>koffiedy@gmail.com</b></p>

        <small><b style="color:#017896">Apprendre l'informatique, un plaisir !!!</b></small>
        `
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

exports.send2 = (rec) => {
    transporter = nodemailer.createTransport({
        service: 'gmail',
        secure: true,
        auth: {
            user: 'nodyTic@gmail.com',
            pass: '@Aristide55'
        }
    });

    var mailOptions = {
        from: 'nodyTic@gmail.com',
        to: rec.mail,
        subject: 'INSCRIPTION - CLUB INFORMATIQUE ESATIC',
        html: `
        <h1>INSCRIPTION - CLUB INFORMATIQUE ESATIC 2019 - 2020</h1>
        <p>Félicitations <b>${rec.nom} ${rec.prenoms}</b> pour votre inscription au club informatique en tant que <b>${rec.type}</b>.</p>
        <p>Les dates des differents tests vous seront communiquées <b style="color:red">ultérieurement.</b></p>

        <p>Pour plus d'informations, nos contacts sont les suivants : </p>
        <p>Tel : <b>+225 51 886 478</b></p>
        <p>Mail : <b>koffiedy@gmail.com</b></p>

        <small><b style="color:#017896">Apprendre l'informatique, un plaisir !!!</b></small>
        `
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}