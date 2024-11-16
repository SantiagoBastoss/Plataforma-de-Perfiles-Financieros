pragma circom 2.1.8;

/*This circuit template checks that c is the multiplication of a and b.*/  

template Autenticador () {  

   // Declaration of signals.  
   signal input a;  
   signal input b; 
   signal input c; 

   signal input d;
   signal input e;

   signal x;
   signal y;
   signal output z;

   // Constraints.  
   x <== ((b+c)*a)+e; 
   y <== (a+b+c)+(x*e); 
   z <== (x+y)*(a+e);
   d === z;
}

component main {public [a,b,c]} = Autenticador();