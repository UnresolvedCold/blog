ARG NODE_IMAGE="mcr.microsoft.com/devcontainers/javascript-node:16-bullseye"

FROM ${NODE_IMAGE}

ARG USERNAME=vscode
ARG USER_UID=1000
ARG USER_GID=$USER_UID
ARG WAKATIME_API=waka

# Create the user
RUN groupadd --gid $USER_GID $USERNAME \
    && useradd --uid $USER_UID --gid $USER_GID -m $USERNAME \
    #
    # [Optional] Add sudo support. Omit if you don't need to install software after connecting.
    && apt-get update \
    && apt-get install -y sudo \
    && echo $USERNAME ALL=\(root\) NOPASSWD:ALL > /etc/sudoers.d/$USERNAME \
    && chmod 0440 /etc/sudoers.d/$USERNAME \
    && apt-get -y install git \
    && apt-get -y install curl \
    && apt-get install -y zsh \
    && chsh -s $(which zsh)


# ********************************************************
# * Anything else you want to do like clean up goes here *
# ********************************************************
ENV HOME /home/vscode

# [Optional] Set the default user. Omit if you want to keep the default as root.
USER $USERNAME

# Setup oh-my-zsh
RUN sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
RUN git clone --depth=1 https://github.com/romkatv/powerlevel10k.git /home/vscode/.oh-my-zsh/custom/themes/powerlevel10k
RUN git clone https://github.com/zsh-users/zsh-autosuggestions /home/vscode/.oh-my-zsh/custom/plugins/zsh-autosuggestions
RUN git clone https://github.com/zsh-users/zsh-syntax-highlighting.git /home/vscode/.oh-my-zsh/custom/plugins/zsh-syntax-highlighting
COPY .zshrc /home/vscode/
COPY .p10k.zsh /home/vscode/

# Setup Wakatime 
RUN echo [settings] > ~/.wakatime.cfg; echo api_key = $WAKATIME_API >> ~/.wakatime.cfg