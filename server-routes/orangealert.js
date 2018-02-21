app.post('/orangee',function(req,res){
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

    const msg1o = {
      to: s1,
      from: req.body.mail,
      subject: 'Help alert',
      text: req.body.text,
      html: `<strong>${req.body.text}</strong>`,
    };
    const msg2o = {
      to: s2,
      from: req.body.mail,
      subject: 'Help alert',
      text: req.body.text,
      html: `<strong>${req.body.text}</strong>`,
    };
  //  sgMail.send(msg1o);
  //  sgMail.send(msg2o);

  })
