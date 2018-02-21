app.post('/redsafety',function(req,res){
  console.log("reachded here in redvelvet");
  console.log(req.body.mail);
  let u=req.body.mail;
  let t=req.body.text;
  let query="select * from trusted";
  connection.query(query, function(err,data){
    if(err) throw err;
    let s1=(data[0].t_e);
    let s2=(data[2].t_e);
    let s3=(data[3].t_e);
    let s4=(data[1].t_e);
    let s5=(data[4].t_e);
    let s6=(data[5].t_e);
    const msg1t = {
      to: s1,
      from: req.body.mail,
      subject: 'CALL FOR HELP',
      text: req.body.text,
      html: `<strong>${req.body.text}</strong>`,
    };
    const msg2t = {
      to: s1,
      from: req.body.mail,
      subject: 'CALL FOR HELP',
      text: req.body.text,
      html: `<strong>${req.body.text}</strong>`,
    };
    const msg3t = {
      to: s1,
      from: req.body.mail,
      subject: 'CALL FOR HELP',
      text: req.body.text,
      html: `<strong>${req.body.text}</strong>`,
    };
    const msg4t = {
      to: s1,
      from: req.body.mail,
      subject: 'CALL FOR HELP',
      text: req.body.text,
      html: `<strong>${req.body.text}</strong>`,
    };
    const msg5t = {
      to: s1,
      from: req.body.mail,
      subject: 'CALL FOR HELP',
      text: req.body.text,
      html: `<strong>${req.body.text}</strong>`,
    };
    const msg6t = {
      to: s1,
      from: req.body.mail,
      subject: 'CALL FOR HELP',
      text: req.body.text,
      html: `<strong>${req.body.text}</strong>`,
    };
    console.log("all the six messages have been prepared");

    //  sgMail.send(msg1t);
    //  sgMail.send(msg2t);
    //  sgMail.send(msg3t);
    //  sgMail.send(msg4t);
    //  sgMail.send(msg5t);
    //  sgMail.send(msg6t);

    console.log("emails will be sent");

  })

  res.sendStatus(200);
})

app.post('/rede',function(req,res){
//  console.log(req.body);
  console.log("email id is :", req.body.mail);
  console.log("email content is :", req.body.text);

  let query=`select * from user_info where u_e="${req.body.mail}"`;

  connection.query(query,function(err,data){
    if(err) throw err;
    console.log(data);
    var s1=data[0].c1_e;
    var s2=data[0].c2_e;
    console.log(s1,s2);

    const msg1r = {
      to: s1,
      from: req.body.mail,
      subject: 'DANGER ALERT',
      text: req.body.text,
      html: `<strong>${req.body.text}</strong>`,
    };
    const msg2r = {
      to: s2,
      from: req.body.mail,
      subject: 'DANGER ALERT',
      text: req.body.text,
      html: `<strong>${req.body.text}</strong>`,
    };
  //  sgMail.send(msg1r);
  //  sgMail.send(msg2r);

  })


  // mail to be commented out
  res.send("We have informed your trusted contacts that you are in DANGER!! Thanks for using LOCALERT");

});
