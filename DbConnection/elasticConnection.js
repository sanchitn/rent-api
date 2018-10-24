var elasticsearch=require('elasticsearch');
var client = new elasticsearch.Client( {  
    hosts: [
      'http://localhost:8200',
     
    ]
  });
  
  module.exports = client;