app.post('/gethelpline',function(req,res){
  console.log("the email id request is ",req.body.ue);
  let query=`select * from user_info where u_e="${req.body.ue}"`;

  connection.query(query,function(err,data){
    if(err) throw err;
    console.log(data);
    var s1=data[0].c1_e;
    var s2=data[0].c2_e;
    console.log(s1,s2);
    let obj={
      's1':s1,
      's2':s2
    };
    console.log(obj);
    res.send(obj);
})
}
);


app.post('/signup',function(req,res){
  console.log("we are getting the form data ");
  console.log("req.body received");
  let u_f_n=req.body.user_first_name;
  let u_l_n=req.body.user_last_name;
  let u_e=req.body.user_email;
  let u_p=req.body.user_phone;
  let c1_e=req.body.c1_email;
  let c1_p=req.body.c1_phone;
  let c2_e=req.body.c2_email;
  let c2_p=req.body.c2_phone;
  console.log(u_f_n, u_l_n,u_e,u_p,c1_e,c1_p,c2_e,c2_p);
  let query=`select * from user_info where u_e="${req.body.user_email}"`;

  connection.query(query,function(err,data){
    if(err) throw err;
    if(data==null){
        console.log("doesnot alreadyexist in database");
        console.log("anyways writing into database");
         query=`insert into user_info(u_f_n,u_l_n,u_e,u_p,c1_e,c1_p,c2_e,c2_p) values("${u_f_n}","${u_l_n}","${u_e}",${u_p},"${c1_e}",${c1_p},"${c2_e}",${c2_p})`;
          connection.query(query, function(err,data){
            if(err) throw err;
            console.log(data);
          });
       }


    else{
      query=`delete from user_info where u_e="${u_e}"`;
      connection.query(query,function(err,data){
        console.log("already exisited in database so deleted");
        if(err) throw err;
        console.log(data);
        console.log("anyways writing into database");
         query=`insert into user_info(u_f_n,u_l_n,u_e,u_p,c1_e,c1_p,c2_e,c2_p) values("${u_f_n}","${u_l_n}","${u_e}",${u_p},"${c1_e}",${c1_p},"${c2_e}",${c2_p})`;
          connection.query(query, function(err,data){
            if(err) throw err;
            console.log(data);
          })
      });

    }
  })


  res.redirect('/');

})
