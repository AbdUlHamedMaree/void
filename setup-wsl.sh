# Config
CMDLINE_NAME=commandlinetools-linux-10406996_latest.zip
BASH_PROFILE_FILE=~/.bashrc

cd ~

# Preparing
sudo apt-get install unzip zip socat
sudo apt-get install -y lib32z1

# 1. install sdkman
curl -s "https://get.sdkman.io" | bash
source "$HOME/.sdkman/bin/sdkman-init.sh"

# 2. install the android command line tools
# see https://developer.android.com/studio#command-tools for latest commandline-tools

wget https://dl.google.com/android/repository/$CMDLINE_NAME
unzip $CMDLINE_NAME -d Android
rm $CMDLINE_NAME

# 3. install java
sdk install java

# 4. fix the file structure
mkdir Android/cmdline-tools/latest
mv Android/cmdline-tools/* Android/cmdline-tools/latest

export ANDROID_SDK_ROOT=$HOME/Android
export ANDROID_HOME=$ANDROID_SDK_ROOT

export PATH=$PATH:$ANDROID_SDK_ROOT/cmdline-tools/latest
export PATH=$PATH:$ANDROID_SDK_ROOT/cmdline-tools/latest/bin
export PATH=$PATH:$ANDROID_SDK_ROOT/platform-tools

printf "\n\nexport ANDROID_SDK_ROOT=\$HOME/Android\n\nexport ANDROID_HOME=\$ANDROID_SDK_ROOT\n\nexport PATH=\$PATH:\$ANDROID_SDK_ROOT/cmdline-tools/latest\nexport PATH=\$PATH:\$ANDROID_SDK_ROOT/cmdline-tools/latest/bin\nexport PATH=\$PATH:\$ANDROID_SDK_ROOT/platform-tools" >> $BASH_PROFILE_FILE

# 5. install SDKs
sdkmanager --install "platform-tools" "platforms;android-33" "build-tools;33.0.0"
sdkmanager --update

# 6. install gradle
sdk install gradle
gradle -v

# 7. setup wsl adb server config
export WSL_HOST=$(tail -1 /etc/resolv.conf | cut -d' ' -f2)
export ADB_SERVER_SOCKET=tcp:$WSL_HOST:5037

printf "\n\nexport WSL_HOST=\$(tail -1 /etc/resolv.conf | cut -d' ' -f2)\nexport ADB_SERVER_SOCKET=tcp:\$WSL_HOST:5037" >> $BASH_PROFILE_FILE

# run below commands in windows pwsh as adminstrator:
# iex "netsh interface portproxy delete v4tov4 listenport=8081 listenaddress=127.0.0.1" | out-null;
# $WSL_CLIENT = bash.exe -c "ifconfig eth0 | grep 'inet '";
# $WSL_CLIENT -match '\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}';
# $WSL_CLIENT = $matches[0];
# iex "netsh interface portproxy add v4tov4 listenport=8081 listenaddress=127.0.0.1 connectport=8081 connectaddress=$WSL_CLIENT"

# After that you need to either start an emulator or connect a device
# then on Windows pwsh you need to run:
# adb -a nodaemon server start
# and on linux run:
# socat -d -d TCP-LISTEN:5037,reuseaddr,fork TCP:$(cat /etc/resolv.conf | tail -n1 | cut -d " " -f 2):5037

# then start the android command and everything should works