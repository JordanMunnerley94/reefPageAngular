export class TableDecadeData {
    decade: string;

    mHcAvg: number;
    mHcMin: number;
    mHcMax: number;

    cotAvg: number;
    cotMin: number;
    cotMax: number;

    bHcAvg: number;
    bHcMin: number;
    bHcMax: number;

    coralAbundanceAvg: number;
    coralAbundanceMin: number;
    coralAbundanceMax: number;

    avgSpecies: number;
    minSpecies: number;
    maxSpecies: number;


    constructor(decade: string,
                mHcAvg: number, mHcMin: number, mHcMax: number,
                cotAvg: number, cotMin: number, cotMax: number,
                bHcAvg: number, bHcMin: number, bHcMax: number,
                coralAbundanceAvg: number, coralAbundanceMin: number, coralAbundanceMax: number,
                avgSpecies: number, minSpecies: number, maxSpecies: number)
    {
        this.decade = decade;
        this.mHcAvg = mHcAvg;
        this.mHcMin = mHcMin;
        this.mHcMax = mHcMax;
        this.cotAvg = cotAvg;
        this.cotMin = cotMin;
        this.cotMax = cotMax;
        this.bHcAvg = bHcAvg;
        this.bHcMin = bHcMin;
        this.bHcMax = bHcMax;
        this.coralAbundanceAvg = coralAbundanceAvg;
        this.coralAbundanceMin = coralAbundanceMin;
        this.coralAbundanceMax = coralAbundanceMax;
        this.avgSpecies = avgSpecies;
        this.minSpecies = minSpecies;
        this.maxSpecies = maxSpecies;
    }
}

