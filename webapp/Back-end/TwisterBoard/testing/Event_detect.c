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

void detecter(void){
  printf("Released");
}

int main (void)
{
<<<<<<< HEAD
  printf ("Raspberry Pi blink %i\n") ;
=======
  printf ("Raspberry Pi blink\n") ;
>>>>>>> bd7cc85cafe3b52dd592c12784c5e0b91ae2993d

  if (wiringPiSetup () == -1)
    return 1 ;

  pinMode (11, INPUT) ;         // aka BCM_GPIO pin 17

  if ( wiringPiISR (INT_PIN, INT_EDGE_RISING , &detecter) < 0){
    fprintf (stderr, "Unable to setup ISR: %s\n", strerror (errno));
    return 1;
  }

  while (1)
  {
    char value = digitalRead(11);
    delay(100);
    printf("%i\n",value);
  }
  return 0 ;
}



