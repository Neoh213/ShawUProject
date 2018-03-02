# cat con-test.py
import time
import sys
from random import randint

store = 'Legros and Sons'
#sound_level = 0

for x in range(0,100):
    print (randint(1,100))
    sys.stdout.flush()
    #sound_level = sound_level+1
    time.sleep(.5);
    
#print(20)

    

#sql = "INSERT INTO app_practice(store, sound_level, whenwhere) VALUES ('Legros and Sons', 15, '2018-01-03 14:40:23')"



