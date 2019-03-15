# Using obs_file with DMstack13.0 
# (method1: docker, method2: miniconda2)
Author: Bhishan Poudel  

This repo is a basic tutorial how to get started with using DMstack and obs_file
in Docker.

## 1.0 If you are inside docker env stop and remove lsst environment from docker
```
exit # inside the docker environment
docker stop lsst; docker rm lsst  
# docker rm $(docker ps -a -q)  # WARNING: removes all docker containers
```

## 1.1 Prepare data to use with obs_file
```
# The file trial00_good.fits is obtained from jedisim cluster simulation.
# After we get output from jedisim, we add psf and fake wcs to this and call it trial00_good.fits.
# This command is run in local computer, not inside docker.
mkdir -p ~/Temp/dmstack/example; cd ~/Temp/dmstack/example; pwd
curl https://github.com/bhishanpdl/DMstack_obsfile_example/raw/master/example/trial00_good_fits.zip -L -o a.zip
unzip a.zip; mv trial00_good.fits trial00.fits; rm a.zip; rm -rf __MACOSX; clear; ls; cd ..; ls

# Now we are at `~/Temp/dmstack` directory and we have `examples` directory here.
```

## 1.2 Setup lsst environment inside docker
For the reference follow [LSST Pipelines instructions] (https://pipelines.lsst.io/install/docker.html).

```
# Before running docker open XQuartz App from Search Button
# Latest dmstack is version 16 (July 2018)
# docker run -itd --name lsst -v `pwd`:/home/lsst/mnt lsstsqre/centos:7-stack-lsst_distrib-v16_0
docker run -itd --name lsst -v `pwd`:/home/lsst/mnt lsstsqre/centos:7-stack-lsst_distrib-v13_0 #Compatible with obs_file
docker exec -it lsst bash
cd /home/lsst/mnt/
# If we already have aliases.sh now we can do source aliases.sh
source /opt/lsst/software/stack/loadLSST.bash
setup lsst_distrib
```

Note: We can download aliases.sh using these commands:
```
cmd t # to open new tab on terminal
cd  ~/Temp/dmstack
curl https://github.com/bhishanpdl/DMstack_obsfile_example/raw/master/aliases.sh -L -o aliases.sh
cat aliases.sh

# now go to lsst env inside docker
source aliases.sh
```

To use these aliase we need to source this file ```source aliases.sh```.

## 1.3 Setup obs_file environment
```
# We are at ~/Temp/dmstack  directory and we have example/trail00.fits path here.
git clone https://github.com/SimonKrughoff/obs_file
cd obs_file
git checkout 21fd0d51806c43bf335300a0bc97e409ed9c703e
setup -k -r .
scons
cd ..
```

## 1.4 Ingest and process the data
```
cd example
echo 'config.charImage.repair.cosmicray.nCrPixelMax=1000000' > processCcdConfig.py
ls # it should have trial00.fits and processCcdConfig.py

mkdir -p input; echo "lsst.obs.file.FileMapper" > input/_mapper

ingestImages.py input/ trial00.fits --mode link  # creates input/raw/trial00.fits  and input/registry.sqlite3

processCcd.py input/ --id filename=trial00.fits --config isr.noise=5 --configfile processCcdConfig.py --clobber-config --output output
# Main output of processCcd.py is output/src/trial00/src.fits Table, ds9 can't open this talbe but fv-viewer can open this.
# We can also save the table as ascii file using the script below. (we can also save ascii from fv-viewer).
```

## 1.5 Look at Output
The output file produced is `output/src/trial00/src.fits`.
We can view this file using fv viewer. For simplicity we can set `.fit` as a 
default file extension for fv-viewer and copy src.fits to src.fit and open with
fv-viewer.
```
# Open new tab window outside of docker environment
cd ~/Temp/dmstack/example; ls
/Applications/fv.app/Contents/MacOS/fv output/src/trial00/src.fits
 ```
 
 We can also get some the important quantities from src.fits table using the 
 script `read_src_fits.py`.
 
 ```
 # Note: Generally curl downloads webpages from a link, we should use the curl command wisely (like used below ) 
 #       to download python scripts.
 curl https://github.com/bhishanpdl/DMstack_obsfile_example/raw/master/example/read_src_fits.py -L -o read_src_fits.py
 python read_src_fits.py
 head src_fits.csv
 ```
## 1.6 Exit from docker
If we want to exit from docker we may run following commands:
```
exit # inside the docker environment
docker stop lsst  
docker rm lsst  
docker rm $(docker ps -a -q)  # WARNING: removes all docker containers
```

# Method 2: DMstack Using Miniconda2
## 2.1 If dmstack is not installed using miniconda2 follow the [instructions](https://pipelines.lsst.io/v/13-0/install/conda.html).

## 2.2 Check Miniconda environment
`python --version` # if it is not miniconda2 python2.7 change to that environment

## 2.3 Setup lsst environment
```bash
source activate lsst && source eups-setups.sh && setup lsst_distrib
```

## 2.4 Setup obs_file
```bash
# First download the obs_file to the folder ~/Softwares/
cd ~/Softwares/obs_file && setup -k -r . && scons && cd - && ls
```

## 2.5 Create input and output dirs
```
rm -rf input output; mkdir input output
```

## 2.6 Provide the mapper
```
mkdir input; echo "lsst.obs.file.FileMapper" > input/_mapper
```

## 2.7 Ingest the data
```
# NOTE: ingest needs  `pip install file` with ananonda2 pip., file needs libmagic.h and libmagic.dylib file.
ingestImages.py input/ trial00.fits --mode link
```

## 2.8 Process the data
```
# processCcd.py --help
echo 'config.charImage.repair.cosmicray.nCrPixelMax=1000000' > processCcdConfig.py
processCcd.py input/ --id filename=trial00.fits --config isr.noise=5 --output output --configfile processCcdConfig.py --clobber-config
```

## 2.9 Look at the output file (src.fits)
```
cp output/src/*/src.fits src.fit
/Users/poudel/Applications/fv/fv.app/Contents/MacOS/fv src.fit
```

## Load the modules

## Footnote:
1. The obs_file was originally obtained from [Simon Krughoff](https://github.com/SimonKrughoff/obs_file/tree/tickets/DM-6924)
repository. For some reason I was getting error when I use
this repo in docker dmstack13.0 version. 
I have uploaded working version of obs_file in this github repo.

2. Another example of running obs_file can be found at github repo of [Binyang Liu](https://github.com/rbliu/Memo-Linux/blob/master/how_to_run_obs_file.md).
