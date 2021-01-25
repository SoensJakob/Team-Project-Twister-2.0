/*
 * blink.c:
 *      blinks the first LED
 *      Gordon Henderson, projects@drogon.net
 */

#include <stdio.h>
#include <string.h>
#include <errno.h>
#include <stdlib.h>
#include <wiringPi.h>

#define INT_PIN 14
//#define PINS_ARRAY [[4, 17,27,22,10,9 ],[11,0, 5, 6, 13,19],[26,21,20,16,12,1 ],[7, 8, 25,24,23,18]]


typedef enum {false, true} bool;

// Acces paramters passed by commandline 
// Use argv[*]

int main (int argc, char **argv)
{
  printf ("Raspberry Pi blink \n") ;

  if (wiringPiSetup () < 0)
    return 1 ;

  pinMode (INT_PIN, OUTPUT) ;         // aka BCM_GPIO pin 17

  int bits = argv[1];
  for (int i =0; i<3; i++){
    printf("starting %d\n", i);
    for(int y=0; y<8; y++){
      int bit = (bits >> y) & 1;
      
      int ret_val = writeBit(bit);
      printf("%d\n",bit);
      if (ret_val == 1){
        break;
      }
    }
  }

  return 0 ;
}

int writeBit (int state)
{
  //printf("Writing bit %d\n", state)
  if (state == 1){
    digitalWrite(INT_PIN, 1);
    int start = micros();
    delayMicroseconds(0.85);
    digitalWrite(INT_PIN, 0);
    delayMicroseconds(0.4);
    return 0;
  }
  else if (state == 0) {
    digitalWrite(INT_PIN, 1);
    delayMicroseconds(0.4);
    digitalWrite(INT_PIN, 0);
    delayMicroseconds(0.85);
    return 0;
  }
  else{
    return 1;
  }
  
}

void reset (void){
  digitalWrite(INT_PIN, 0);
  delayMicroseconds(60);
  digitalWrite(INT_PIN,1);
};



