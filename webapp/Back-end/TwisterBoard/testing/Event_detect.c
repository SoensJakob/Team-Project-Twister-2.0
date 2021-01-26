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

#define INT_PIN 11
#define PINS_ARRAY [[4, 17,27,22,10,9 ],[11,0, 5, 6, 13,19],[26,21,20,16,12,1 ],[7, 8, 25,24,23,18]]


void detecter(void){
  delay(100);
  printf("Released ");
  char String[255];
  sprintf(String, "gpio edge %d falling", INT_PIN);
  system(String);
  printf("Delete listener ");
}

// Acces paramters passed by commandline 
// Use argv[*]

int main (int argc, char **argv)
{
  printf ("Raspberry Pi blink \n") ;

  if (wiringPiSetup () < 0)
    return 1 ;

  pinMode (11, INPUT) ;         // aka BCM_GPIO pin 17

  if ( wiringPiISR (INT_PIN, INT_EDGE_RISING , &detecter) < 0){
    fprintf (stderr, "Unable to setup ISR: %s\n", strerror (errno));
    return 1;
  }

  while (1)
  {
    printf("Checking values\n");
    delay(500);
  }
  return 0 ;
}



