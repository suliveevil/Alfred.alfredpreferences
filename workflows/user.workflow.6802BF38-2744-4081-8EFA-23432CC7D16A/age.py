import os
import alp

import datetime as dt

def getPreciseAge():
    lstObj = alp.args()
    lstObjLength = len(lstObj)
    returnMe = 'Opps !!!'
    if (lstObjLength >= 3):
        if (lstObjLength == 4):
            returnMe = getAge(lstObj[0], lstObj[1], lstObj[2], lstObj[3])
        elif (lstObjLength == 5):
            returnMe = getAge(lstObj[0], lstObj[1], lstObj[2], lstObj[3], lstObj[4])
        else:
            returnMe = getAge(lstObj[0], lstObj[1], lstObj[2])
    return returnMe

def getAge(pDay, pMonth, pYear, pHr=0, pMin=0, pSec=0):
    dtString    = str(pDay) + ' ' + str(pMonth) + ' ' + str(pYear) + ' ' + str(pHr) + ' ' + str(pMin) + ' ' + str(pSec) 
    dobDate     = dt.datetime.strptime(dtString, '%d %m %Y %H %M %S')
    dobYr       = dobDate.year
    dobMon      = dobDate.month
    dobDay      = dobDate.day
    dobHr       = dobDate.hour
    dobMin      = dobDate.minute
    dobSec      = dobDate.second
    # print('DOB = ' + str(dobYr) + " : "  + str(dobMon) + " : "  + str(dobDay) + " : " + str(dobHr) + " : " + str(dobMin) + " : " + str(dobSec))

    # current date
    curDate     = dt.datetime.today()
    curYr       = curDate.year
    curMon      = curDate.month
    curDay      = curDate.day
    curHr       = curDate.hour
    curMin      = curDate.minute
    curSec      = curDate.second
    # print('Current = ' + str(curYr) + " : "  + str(curMon) + " : "  + str(curDay) + " : " + str(curHr) + " : " + str(curMin) + " : " + str(curSec))

    diffYr      = curYr - dobYr
    diffMon     = curMon - dobMon
    diffDay     = curDay - dobDay
    diffHr      = curHr - dobHr
    diffMin     = curMin - dobMin
    diffSec     = curSec - dobSec

    if (diffSec < 0):
        diffMin -= 1
        diffSec += dobSec

    if (diffMin < 0):
        diffHr -= 1
        diffMin += dobMin

    if (diffHr < 0):
        diffDay -= 1
        diffHr += dobHr

    if (diffDay < 0):
        diffMon -= 1
        diffDay += dobDay

    if (diffMon < 0):
        diffYr -= 1
        diffMon += 12

    returnMe = str(diffYr) + ' yr, ' + str(diffMon) + ' mn, ' + str(diffDay) + ' dy, ' + str(diffHr) + ' hr, ' + str(diffMin) + ' min, ' + str(diffSec) + ' sec'
    return returnMe

if __name__ == "__main__":
    print(getPreciseAge())
