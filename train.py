{
  "nbformat": 4,
  "nbformat_minor": 0,
  "metadata": {
    "colab": {
      "provenance": [],
      "include_colab_link": true
    },
    "kernelspec": {
      "name": "python3",
      "display_name": "Python 3"
    },
    "language_info": {
      "name": "python"
    }
  },
  "cells": [
    {
      "cell_type": "markdown",
      "metadata": {
        "id": "view-in-github",
        "colab_type": "text"
      },
      "source": [
        "<a href=\"https://colab.research.google.com/github/transmogrify-cell/transmogrify-cell/blob/main/train.py\" target=\"_parent\"><img src=\"https://colab.research.google.com/assets/colab-badge.svg\" alt=\"Open In Colab\"/></a>"
      ]
    },
    {
      "cell_type": "markdown",
      "source": [
        "## Building a GPT\n",
        "\n",
        "Companion notebook to the [Zero To Hero](https://karpathy.ai/zero-to-hero.html) video on GPT."
      ],
      "metadata": {
        "id": "wJpXpmjEYC_T"
      }
    },
    {
      "cell_type": "code",
      "execution_count": 7,
      "metadata": {
        "colab": {
          "base_uri": "https://localhost:8080/"
        },
        "id": "h5hjCcLDr2WC",
        "outputId": "ad2e03b5-2f36-45e8-b8ed-c78844766315"
      },
      "outputs": [
        {
          "output_type": "stream",
          "name": "stdout",
          "text": [
            "--2024-12-16 17:34:27--  https://raw.githubusercontent.com/transmogrify-cell/train-ml-/refs/heads/main/data.txt%20?token=GHSAT0AAAAAAC3KZ3SP4FRHL73DUQTIHFPGZ3AMS7A\n",
            "Resolving raw.githubusercontent.com (raw.githubusercontent.com)... 185.199.108.133, 185.199.109.133, 185.199.110.133, ...\n",
            "Connecting to raw.githubusercontent.com (raw.githubusercontent.com)|185.199.108.133|:443... connected.\n",
            "HTTP request sent, awaiting response... 200 OK\n",
            "Length: 1227977 (1.2M) [text/plain]\n",
            "Saving to: ‘data.txt ?token=GHSAT0AAAAAAC3KZ3SP4FRHL73DUQTIHFPGZ3AMS7A’\n",
            "\n",
            "data.txt ?token=GHS 100%[===================>]   1.17M  --.-KB/s    in 0.05s   \n",
            "\n",
            "2024-12-16 17:34:27 (24.5 MB/s) - ‘data.txt ?token=GHSAT0AAAAAAC3KZ3SP4FRHL73DUQTIHFPGZ3AMS7A’ saved [1227977/1227977]\n",
            "\n"
          ]
        }
      ],
      "source": [
        "# We always start with a dataset to train on. Let's download the tiny shakespeare dataset\n",
        "!wget https://raw.githubusercontent.com/transmogrify-cell/train-ml-/refs/heads/main/data.txt%20?token=GHSAT0AAAAAAC3KZ3SP4FRHL73DUQTIHFPGZ3AMS7A"
      ]
    },
    {
      "cell_type": "code",
      "source": [
        "# read it in to inspect it\n",
        "with open('input.txt', 'r', encoding='utf-8') as f:\n",
        "    text = f.read()"
      ],
      "metadata": {
        "id": "O6medjfRsLD9"
      },
      "execution_count": 8,
      "outputs": []
    },
    {
      "cell_type": "code",
      "source": [
        "print(\"length of dataset in characters: \", len(text))"
      ],
      "metadata": {
        "colab": {
          "base_uri": "https://localhost:8080/"
        },
        "id": "6xWI_VyAsN8F",
        "outputId": "6135483e-dbd9-4cca-fc86-cbd364644709"
      },
      "execution_count": 10,
      "outputs": [
        {
          "output_type": "stream",
          "name": "stdout",
          "text": [
            "length of dataset in characters:  1115394\n"
          ]
        }
      ]
    },
    {
      "cell_type": "code",
      "source": [
        "# let's look at the first 1000 characters\n",
        "print(text[:1000])"
      ],
      "metadata": {
        "colab": {
          "base_uri": "https://localhost:8080/"
        },
        "id": "2c5V0FvqseE0",
        "outputId": "25ca7adc-b8c0-42d1-b08c-e0863c5c314e"
      },
      "execution_count": null,
      "outputs": [
        {
          "output_type": "stream",
          "name": "stdout",
          "text": [
            "First Citizen:\n",
            "Before we proceed any further, hear me speak.\n",
            "\n",
            "All:\n",
            "Speak, speak.\n",
            "\n",
            "First Citizen:\n",
            "You are all resolved rather to die than to famish?\n",
            "\n",
            "All:\n",
            "Resolved. resolved.\n",
            "\n",
            "First Citizen:\n",
            "First, you know Caius Marcius is chief enemy to the people.\n",
            "\n",
            "All:\n",
            "We know't, we know't.\n",
            "\n",
            "First Citizen:\n",
            "Let us kill him, and we'll have corn at our own price.\n",
            "Is't a verdict?\n",
            "\n",
            "All:\n",
            "No more talking on't; let it be done: away, away!\n",
            "\n",
            "Second Citizen:\n",
            "One word, good citizens.\n",
            "\n",
            "First Citizen:\n",
            "We are accounted poor citizens, the patricians good.\n",
            "What authority surfeits on would relieve us: if they\n",
            "would yield us but the superfluity, while it were\n",
            "wholesome, we might guess they relieved us humanely;\n",
            "but they think we are too dear: the leanness that\n",
            "afflicts us, the object of our misery, is as an\n",
            "inventory to particularise their abundance; our\n",
            "sufferance is a gain to them Let us revenge this with\n",
            "our pikes, ere we become rakes: for the gods know I\n",
            "speak this in hunger for bread, not in thirst for revenge.\n",
            "\n",
            "\n"
          ]
        }
      ]
    },
    {
      "cell_type": "code",
      "source": [
        "# here are all the unique characters that occur in this text\n",
        "chars = sorted(list(set(text)))\n",
        "vocab_size = len(chars)\n",
        "print(''.join(chars))\n",
        "print(vocab_size)"
      ],
      "metadata": {
        "colab": {
          "base_uri": "https://localhost:8080/"
        },
        "id": "0e-Rbyr8sfM8",
        "outputId": "f34e94a9-5b44-4cf3-885b-986731929109"
      },
      "execution_count": null,
      "outputs": [
        {
          "output_type": "stream",
          "name": "stdout",
          "text": [
            "\n",
            " !$&',-.3:;?ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz\n",
            "65\n"
          ]
        }
      ]
    },
    {
      "cell_type": "code",
      "source": [
        "# create a mapping from characters to integers\n",
        "stoi = { ch:i for i,ch in enumerate(chars) }\n",
        "itos = { i:ch for i,ch in enumerate(chars) }\n",
        "encode = lambda s: [stoi[c] for c in s] # encoder: take a string, output a list of integers\n",
        "decode = lambda l: ''.join([itos[i] for i in l]) # decoder: take a list of integers, output a string\n",
        "\n",
        "print(encode(\"hii there\"))\n",
        "print(decode(encode(\"hii there\")))"
      ],
      "metadata": {
        "colab": {
          "base_uri": "https://localhost:8080/"
        },
        "id": "Yw1LKNCgwjj1",
        "outputId": "86fcc21c-2cf7-40d9-cd7b-b5a253da4459"
      },
      "execution_count": null,
      "outputs": [
        {
          "output_type": "stream",
          "name": "stdout",
          "text": [
            "[46, 47, 47, 1, 58, 46, 43, 56, 43]\n",
            "hii there\n"
          ]
        }
      ]
    },
    {
      "cell_type": "code",
      "source": [
        "# let's now encode the entire text dataset and store it into a torch.Tensor\n",
        "import torch # we use PyTorch: https://pytorch.org\n",
        "data = torch.tensor(encode(text), dtype=torch.long)\n",
        "print(data.shape, data.dtype)\n",
        "print(data[:1000]) # the 1000 characters we looked at earier will to the GPT look like this"
      ],
      "metadata": {
        "colab": {
          "base_uri": "https://localhost:8080/"
        },
        "id": "YJb0OXPwzvqg",
        "outputId": "db7297cc-36a9-4fae-e941-e7bb9e0e91d1"
      },
      "execution_count": null,
      "outputs": [
        {
          "output_type": "stream",
          "name": "stdout",
          "text": [
            "torch.Size([1115394]) torch.int64\n",
            "tensor([18, 47, 56, 57, 58,  1, 15, 47, 58, 47, 64, 43, 52, 10,  0, 14, 43, 44,\n",
            "        53, 56, 43,  1, 61, 43,  1, 54, 56, 53, 41, 43, 43, 42,  1, 39, 52, 63,\n",
            "         1, 44, 59, 56, 58, 46, 43, 56,  6,  1, 46, 43, 39, 56,  1, 51, 43,  1,\n",
            "        57, 54, 43, 39, 49,  8,  0,  0, 13, 50, 50, 10,  0, 31, 54, 43, 39, 49,\n",
            "         6,  1, 57, 54, 43, 39, 49,  8,  0,  0, 18, 47, 56, 57, 58,  1, 15, 47,\n",
            "        58, 47, 64, 43, 52, 10,  0, 37, 53, 59,  1, 39, 56, 43,  1, 39, 50, 50,\n",
            "         1, 56, 43, 57, 53, 50, 60, 43, 42,  1, 56, 39, 58, 46, 43, 56,  1, 58,\n",
            "        53,  1, 42, 47, 43,  1, 58, 46, 39, 52,  1, 58, 53,  1, 44, 39, 51, 47,\n",
            "        57, 46, 12,  0,  0, 13, 50, 50, 10,  0, 30, 43, 57, 53, 50, 60, 43, 42,\n",
            "         8,  1, 56, 43, 57, 53, 50, 60, 43, 42,  8,  0,  0, 18, 47, 56, 57, 58,\n",
            "         1, 15, 47, 58, 47, 64, 43, 52, 10,  0, 18, 47, 56, 57, 58,  6,  1, 63,\n",
            "        53, 59,  1, 49, 52, 53, 61,  1, 15, 39, 47, 59, 57,  1, 25, 39, 56, 41,\n",
            "        47, 59, 57,  1, 47, 57,  1, 41, 46, 47, 43, 44,  1, 43, 52, 43, 51, 63,\n",
            "         1, 58, 53,  1, 58, 46, 43,  1, 54, 43, 53, 54, 50, 43,  8,  0,  0, 13,\n",
            "        50, 50, 10,  0, 35, 43,  1, 49, 52, 53, 61,  5, 58,  6,  1, 61, 43,  1,\n",
            "        49, 52, 53, 61,  5, 58,  8,  0,  0, 18, 47, 56, 57, 58,  1, 15, 47, 58,\n",
            "        47, 64, 43, 52, 10,  0, 24, 43, 58,  1, 59, 57,  1, 49, 47, 50, 50,  1,\n",
            "        46, 47, 51,  6,  1, 39, 52, 42,  1, 61, 43,  5, 50, 50,  1, 46, 39, 60,\n",
            "        43,  1, 41, 53, 56, 52,  1, 39, 58,  1, 53, 59, 56,  1, 53, 61, 52,  1,\n",
            "        54, 56, 47, 41, 43,  8,  0, 21, 57,  5, 58,  1, 39,  1, 60, 43, 56, 42,\n",
            "        47, 41, 58, 12,  0,  0, 13, 50, 50, 10,  0, 26, 53,  1, 51, 53, 56, 43,\n",
            "         1, 58, 39, 50, 49, 47, 52, 45,  1, 53, 52,  5, 58, 11,  1, 50, 43, 58,\n",
            "         1, 47, 58,  1, 40, 43,  1, 42, 53, 52, 43, 10,  1, 39, 61, 39, 63,  6,\n",
            "         1, 39, 61, 39, 63,  2,  0,  0, 31, 43, 41, 53, 52, 42,  1, 15, 47, 58,\n",
            "        47, 64, 43, 52, 10,  0, 27, 52, 43,  1, 61, 53, 56, 42,  6,  1, 45, 53,\n",
            "        53, 42,  1, 41, 47, 58, 47, 64, 43, 52, 57,  8,  0,  0, 18, 47, 56, 57,\n",
            "        58,  1, 15, 47, 58, 47, 64, 43, 52, 10,  0, 35, 43,  1, 39, 56, 43,  1,\n",
            "        39, 41, 41, 53, 59, 52, 58, 43, 42,  1, 54, 53, 53, 56,  1, 41, 47, 58,\n",
            "        47, 64, 43, 52, 57,  6,  1, 58, 46, 43,  1, 54, 39, 58, 56, 47, 41, 47,\n",
            "        39, 52, 57,  1, 45, 53, 53, 42,  8,  0, 35, 46, 39, 58,  1, 39, 59, 58,\n",
            "        46, 53, 56, 47, 58, 63,  1, 57, 59, 56, 44, 43, 47, 58, 57,  1, 53, 52,\n",
            "         1, 61, 53, 59, 50, 42,  1, 56, 43, 50, 47, 43, 60, 43,  1, 59, 57, 10,\n",
            "         1, 47, 44,  1, 58, 46, 43, 63,  0, 61, 53, 59, 50, 42,  1, 63, 47, 43,\n",
            "        50, 42,  1, 59, 57,  1, 40, 59, 58,  1, 58, 46, 43,  1, 57, 59, 54, 43,\n",
            "        56, 44, 50, 59, 47, 58, 63,  6,  1, 61, 46, 47, 50, 43,  1, 47, 58,  1,\n",
            "        61, 43, 56, 43,  0, 61, 46, 53, 50, 43, 57, 53, 51, 43,  6,  1, 61, 43,\n",
            "         1, 51, 47, 45, 46, 58,  1, 45, 59, 43, 57, 57,  1, 58, 46, 43, 63,  1,\n",
            "        56, 43, 50, 47, 43, 60, 43, 42,  1, 59, 57,  1, 46, 59, 51, 39, 52, 43,\n",
            "        50, 63, 11,  0, 40, 59, 58,  1, 58, 46, 43, 63,  1, 58, 46, 47, 52, 49,\n",
            "         1, 61, 43,  1, 39, 56, 43,  1, 58, 53, 53,  1, 42, 43, 39, 56, 10,  1,\n",
            "        58, 46, 43,  1, 50, 43, 39, 52, 52, 43, 57, 57,  1, 58, 46, 39, 58,  0,\n",
            "        39, 44, 44, 50, 47, 41, 58, 57,  1, 59, 57,  6,  1, 58, 46, 43,  1, 53,\n",
            "        40, 48, 43, 41, 58,  1, 53, 44,  1, 53, 59, 56,  1, 51, 47, 57, 43, 56,\n",
            "        63,  6,  1, 47, 57,  1, 39, 57,  1, 39, 52,  0, 47, 52, 60, 43, 52, 58,\n",
            "        53, 56, 63,  1, 58, 53,  1, 54, 39, 56, 58, 47, 41, 59, 50, 39, 56, 47,\n",
            "        57, 43,  1, 58, 46, 43, 47, 56,  1, 39, 40, 59, 52, 42, 39, 52, 41, 43,\n",
            "        11,  1, 53, 59, 56,  0, 57, 59, 44, 44, 43, 56, 39, 52, 41, 43,  1, 47,\n",
            "        57,  1, 39,  1, 45, 39, 47, 52,  1, 58, 53,  1, 58, 46, 43, 51,  1, 24,\n",
            "        43, 58,  1, 59, 57,  1, 56, 43, 60, 43, 52, 45, 43,  1, 58, 46, 47, 57,\n",
            "         1, 61, 47, 58, 46,  0, 53, 59, 56,  1, 54, 47, 49, 43, 57,  6,  1, 43,\n",
            "        56, 43,  1, 61, 43,  1, 40, 43, 41, 53, 51, 43,  1, 56, 39, 49, 43, 57,\n",
            "        10,  1, 44, 53, 56,  1, 58, 46, 43,  1, 45, 53, 42, 57,  1, 49, 52, 53,\n",
            "        61,  1, 21,  0, 57, 54, 43, 39, 49,  1, 58, 46, 47, 57,  1, 47, 52,  1,\n",
            "        46, 59, 52, 45, 43, 56,  1, 44, 53, 56,  1, 40, 56, 43, 39, 42,  6,  1,\n",
            "        52, 53, 58,  1, 47, 52,  1, 58, 46, 47, 56, 57, 58,  1, 44, 53, 56,  1,\n",
            "        56, 43, 60, 43, 52, 45, 43,  8,  0,  0])\n"
          ]
        }
      ]
    },
    {
      "cell_type": "code",
      "source": [
        "# Let's now split up the data into train and validation sets\n",
        "n = int(0.9*len(data)) # first 90% will be train, rest val\n",
        "train_data = data[:n]\n",
        "val_data = data[n:]"
      ],
      "metadata": {
        "id": "f_WIXqxz0lU5"
      },
      "execution_count": null,
      "outputs": []
    },
    {
      "cell_type": "code",
      "source": [
        "block_size = 8\n",
        "train_data[:block_size+1]"
      ],
      "metadata": {
        "colab": {
          "base_uri": "https://localhost:8080/"
        },
        "id": "TD5Bj8Y6IAD4",
        "outputId": "bf23c586-1d33-4af1-b63d-ce6f90b0a528"
      },
      "execution_count": null,
      "outputs": [
        {
          "output_type": "execute_result",
          "data": {
            "text/plain": [
              "tensor([18, 47, 56, 57, 58,  1, 15, 47, 58])"
            ]
          },
          "metadata": {},
          "execution_count": 9
        }
      ]
    },
    {
      "cell_type": "code",
      "source": [
        "x = train_data[:block_size]\n",
        "y = train_data[1:block_size+1]\n",
        "for t in range(block_size):\n",
        "    context = x[:t+1]\n",
        "    target = y[t]\n",
        "    print(f\"when input is {context} the target: {target}\")"
      ],
      "metadata": {
        "colab": {
          "base_uri": "https://localhost:8080/"
        },
        "id": "9HXDe8vGJCEn",
        "outputId": "588663aa-1de5-4ef7-aba0-4a96fe828353"
      },
      "execution_count": null,
      "outputs": [
        {
          "output_type": "stream",
          "name": "stdout",
          "text": [
            "when input is tensor([18]) the target: 47\n",
            "when input is tensor([18, 47]) the target: 56\n",
            "when input is tensor([18, 47, 56]) the target: 57\n",
            "when input is tensor([18, 47, 56, 57]) the target: 58\n",
            "when input is tensor([18, 47, 56, 57, 58]) the target: 1\n",
            "when input is tensor([18, 47, 56, 57, 58,  1]) the target: 15\n",
            "when input is tensor([18, 47, 56, 57, 58,  1, 15]) the target: 47\n",
            "when input is tensor([18, 47, 56, 57, 58,  1, 15, 47]) the target: 58\n"
          ]
        }
      ]
    },
    {
      "cell_type": "code",
      "source": [
        "torch.manual_seed(1337)\n",
        "batch_size = 4 # how many independent sequences will we process in parallel?\n",
        "block_size = 8 # what is the maximum context length for predictions?\n",
        "\n",
        "def get_batch(split):\n",
        "    # generate a small batch of data of inputs x and targets y\n",
        "    data = train_data if split == 'train' else val_data\n",
        "    ix = torch.randint(len(data) - block_size, (batch_size,))\n",
        "    x = torch.stack([data[i:i+block_size] for i in ix])\n",
        "    y = torch.stack([data[i+1:i+block_size+1] for i in ix])\n",
        "    return x, y\n",
        "\n",
        "xb, yb = get_batch('train')\n",
        "print('inputs:')\n",
        "print(xb.shape)\n",
        "print(xb)\n",
        "print('targets:')\n",
        "print(yb.shape)\n",
        "print(yb)\n",
        "\n",
        "print('----')\n",
        "\n",
        "for b in range(batch_size): # batch dimension\n",
        "    for t in range(block_size): # time dimension\n",
        "        context = xb[b, :t+1]\n",
        "        target = yb[b,t]\n",
        "        print(f\"when input is {context.tolist()} the target: {target}\")"
      ],
      "metadata": {
        "colab": {
          "base_uri": "https://localhost:8080/"
        },
        "id": "Q3k1Czf7LuA9",
        "outputId": "4ea8e8a0-443c-49bb-b3bf-ba36e1712999"
      },
      "execution_count": null,
      "outputs": [
        {
          "output_type": "stream",
          "name": "stdout",
          "text": [
            "inputs:\n",
            "torch.Size([4, 8])\n",
            "tensor([[24, 43, 58,  5, 57,  1, 46, 43],\n",
            "        [44, 53, 56,  1, 58, 46, 39, 58],\n",
            "        [52, 58,  1, 58, 46, 39, 58,  1],\n",
            "        [25, 17, 27, 10,  0, 21,  1, 54]])\n",
            "targets:\n",
            "torch.Size([4, 8])\n",
            "tensor([[43, 58,  5, 57,  1, 46, 43, 39],\n",
            "        [53, 56,  1, 58, 46, 39, 58,  1],\n",
            "        [58,  1, 58, 46, 39, 58,  1, 46],\n",
            "        [17, 27, 10,  0, 21,  1, 54, 39]])\n",
            "----\n",
            "when input is [24] the target: 43\n",
            "when input is [24, 43] the target: 58\n",
            "when input is [24, 43, 58] the target: 5\n",
            "when input is [24, 43, 58, 5] the target: 57\n",
            "when input is [24, 43, 58, 5, 57] the target: 1\n",
            "when input is [24, 43, 58, 5, 57, 1] the target: 46\n",
            "when input is [24, 43, 58, 5, 57, 1, 46] the target: 43\n",
            "when input is [24, 43, 58, 5, 57, 1, 46, 43] the target: 39\n",
            "when input is [44] the target: 53\n",
            "when input is [44, 53] the target: 56\n",
            "when input is [44, 53, 56] the target: 1\n",
            "when input is [44, 53, 56, 1] the target: 58\n",
            "when input is [44, 53, 56, 1, 58] the target: 46\n",
            "when input is [44, 53, 56, 1, 58, 46] the target: 39\n",
            "when input is [44, 53, 56, 1, 58, 46, 39] the target: 58\n",
            "when input is [44, 53, 56, 1, 58, 46, 39, 58] the target: 1\n",
            "when input is [52] the target: 58\n",
            "when input is [52, 58] the target: 1\n",
            "when input is [52, 58, 1] the target: 58\n",
            "when input is [52, 58, 1, 58] the target: 46\n",
            "when input is [52, 58, 1, 58, 46] the target: 39\n",
            "when input is [52, 58, 1, 58, 46, 39] the target: 58\n",
            "when input is [52, 58, 1, 58, 46, 39, 58] the target: 1\n",
            "when input is [52, 58, 1, 58, 46, 39, 58, 1] the target: 46\n",
            "when input is [25] the target: 17\n",
            "when input is [25, 17] the target: 27\n",
            "when input is [25, 17, 27] the target: 10\n",
            "when input is [25, 17, 27, 10] the target: 0\n",
            "when input is [25, 17, 27, 10, 0] the target: 21\n",
            "when input is [25, 17, 27, 10, 0, 21] the target: 1\n",
            "when input is [25, 17, 27, 10, 0, 21, 1] the target: 54\n",
            "when input is [25, 17, 27, 10, 0, 21, 1, 54] the target: 39\n"
          ]
        }
      ]
    },
    {
      "cell_type": "code",
      "source": [
        "print(xb) # our input to the transformer"
      ],
      "metadata": {
        "colab": {
          "base_uri": "https://localhost:8080/"
        },
        "id": "qpyyAeIzQjlO",
        "outputId": "a650f8dc-da81-400b-bc59-0a595487fdb9"
      },
      "execution_count": null,
      "outputs": [
        {
          "output_type": "stream",
          "name": "stdout",
          "text": [
            "tensor([[24, 43, 58,  5, 57,  1, 46, 43],\n",
            "        [44, 53, 56,  1, 58, 46, 39, 58],\n",
            "        [52, 58,  1, 58, 46, 39, 58,  1],\n",
            "        [25, 17, 27, 10,  0, 21,  1, 54]])\n"
          ]
        }
      ]
    },
    {
      "cell_type": "code",
      "source": [
        "import torch\n",
        "import torch.nn as nn\n",
        "from torch.nn import functional as F\n",
        "torch.manual_seed(1337)\n",
        "\n",
        "class BigramLanguageModel(nn.Module):\n",
        "\n",
        "    def __init__(self, vocab_size):\n",
        "        super().__init__()\n",
        "        # each token directly reads off the logits for the next token from a lookup table\n",
        "        self.token_embedding_table = nn.Embedding(vocab_size, vocab_size)\n",
        "\n",
        "    def forward(self, idx, targets=None):\n",
        "\n",
        "        # idx and targets are both (B,T) tensor of integers\n",
        "        logits = self.token_embedding_table(idx) # (B,T,C)\n",
        "\n",
        "        if targets is None:\n",
        "            loss = None\n",
        "        else:\n",
        "            B, T, C = logits.shape\n",
        "            logits = logits.view(B*T, C)\n",
        "            targets = targets.view(B*T)\n",
        "            loss = F.cross_entropy(logits, targets)\n",
        "\n",
        "        return logits, loss\n",
        "\n",
        "    def generate(self, idx, max_new_tokens):\n",
        "        # idx is (B, T) array of indices in the current context\n",
        "        for _ in range(max_new_tokens):\n",
        "            # get the predictions\n",
        "            logits, loss = self(idx)\n",
        "            # focus only on the last time step\n",
        "            logits = logits[:, -1, :] # becomes (B, C)\n",
        "            # apply softmax to get probabilities\n",
        "            probs = F.softmax(logits, dim=-1) # (B, C)\n",
        "            # sample from the distribution\n",
        "            idx_next = torch.multinomial(probs, num_samples=1) # (B, 1)\n",
        "            # append sampled index to the running sequence\n",
        "            idx = torch.cat((idx, idx_next), dim=1) # (B, T+1)\n",
        "        return idx\n",
        "\n",
        "m = BigramLanguageModel(vocab_size)\n",
        "logits, loss = m(xb, yb)\n",
        "print(logits.shape)\n",
        "print(loss)\n",
        "\n",
        "print(decode(m.generate(idx = torch.zeros((1, 1), dtype=torch.long), max_new_tokens=100)[0].tolist()))\n"
      ],
      "metadata": {
        "colab": {
          "base_uri": "https://localhost:8080/"
        },
        "id": "nql_1ER53oCf",
        "outputId": "5de90b1b-4603-428a-f571-fe4bd3c45436"
      },
      "execution_count": null,
      "outputs": [
        {
          "output_type": "stream",
          "name": "stdout",
          "text": [
            "torch.Size([32, 65])\n",
            "tensor(4.8786, grad_fn=<NllLossBackward0>)\n",
            "\n",
            "SKIcLT;AcELMoTbvZv C?nq-QE33:CJqkOKH-q;:la!oiywkHjgChzbQ?u!3bLIgwevmyFJGUGp\n",
            "wnYWmnxKWWev-tDqXErVKLgJ\n"
          ]
        }
      ]
    },
    {
      "cell_type": "code",
      "source": [
        "# create a PyTorch optimizer\n",
        "optimizer = torch.optim.AdamW(m.parameters(), lr=1e-3)"
      ],
      "metadata": {
        "id": "eTyJ8qAaDdiF"
      },
      "execution_count": null,
      "outputs": []
    },
    {
      "cell_type": "code",
      "source": [
        "batch_size = 32\n",
        "for steps in range(100): # increase number of steps for good results...\n",
        "\n",
        "    # sample a batch of data\n",
        "    xb, yb = get_batch('train')\n",
        "\n",
        "    # evaluate the loss\n",
        "    logits, loss = m(xb, yb)\n",
        "    optimizer.zero_grad(set_to_none=True)\n",
        "    loss.backward()\n",
        "    optimizer.step()\n",
        "\n",
        "print(loss.item())\n"
      ],
      "metadata": {
        "colab": {
          "base_uri": "https://localhost:8080/"
        },
        "id": "Hs4kI8YdEkQj",
        "outputId": "42ded55c-2983-4d91-c528-675b2edfa849"
      },
      "execution_count": null,
      "outputs": [
        {
          "output_type": "stream",
          "name": "stdout",
          "text": [
            "4.65630578994751\n"
          ]
        }
      ]
    },
    {
      "cell_type": "code",
      "source": [
        "print(decode(m.generate(idx = torch.zeros((1, 1), dtype=torch.long), max_new_tokens=500)[0].tolist()))"
      ],
      "metadata": {
        "colab": {
          "base_uri": "https://localhost:8080/"
        },
        "id": "EcVIDWAZEtjN",
        "outputId": "0ad6f9d2-ad58-4498-a5f8-6f31407bb18b"
      },
      "execution_count": null,
      "outputs": [
        {
          "output_type": "stream",
          "name": "stdout",
          "text": [
            "\n",
            "oTo.JUZ!!zqe!\n",
            "xBP qbs$Gy'AcOmrLwwt\n",
            "p$x;Seh-onQbfM?OjKbn'NwUAW -Np3fkz$FVwAUEa-wzWC -wQo-R!v -Mj?,SPiTyZ;o-opr$mOiPJEYD-CfigkzD3p3?zvS;ADz;.y?o,ivCuC'zqHxcVT cHA\n",
            "rT'Fd,SBMZyOslg!NXeF$sBe,juUzLq?w-wzP-h\n",
            "ERjjxlgJzPbHxf$ q,q,KCDCU fqBOQT\n",
            "SV&CW:xSVwZv'DG'NSPypDhKStKzC -$hslxIVzoivnp ,ethA:NCCGoi\n",
            "tN!ljjP3fwJMwNelgUzzPGJlgihJ!d?q.d\n",
            "pSPYgCuCJrIFtb\n",
            "jQXg\n",
            "pA.P LP,SPJi\n",
            "DBcuBM:CixjJ$Jzkq,OLf3KLQLMGph$O 3DfiPHnXKuHMlyjxEiyZib3FaHV-oJa!zoc'XSP :CKGUhd?lgCOF$;;DTHZMlvvcmZAm;:iv'MMgO&Ywbc;BLCUd&vZINLIzkuTGZa\n",
            "D.?\n"
          ]
        }
      ]
    },
    {
      "cell_type": "markdown",
      "source": [
        "## The mathematical trick in self-attention"
      ],
      "metadata": {
        "id": "XinV8nmAnmKN"
      }
    },
    {
      "cell_type": "code",
      "source": [
        "# toy example illustrating how matrix multiplication can be used for a \"weighted aggregation\"\n",
        "torch.manual_seed(42)\n",
        "a = torch.tril(torch.ones(3, 3))\n",
        "a = a / torch.sum(a, 1, keepdim=True)\n",
        "b = torch.randint(0,10,(3,2)).float()\n",
        "c = a @ b\n",
        "print('a=')\n",
        "print(a)\n",
        "print('--')\n",
        "print('b=')\n",
        "print(b)\n",
        "print('--')\n",
        "print('c=')\n",
        "print(c)"
      ],
      "metadata": {
        "colab": {
          "base_uri": "https://localhost:8080/"
        },
        "id": "tukiH-NbRBhA",
        "outputId": "d981f6d4-ac08-4ec2-8284-82f5fa1e0815"
      },
      "execution_count": null,
      "outputs": [
        {
          "output_type": "stream",
          "name": "stdout",
          "text": [
            "a=\n",
            "tensor([[1.0000, 0.0000, 0.0000],\n",
            "        [0.5000, 0.5000, 0.0000],\n",
            "        [0.3333, 0.3333, 0.3333]])\n",
            "--\n",
            "b=\n",
            "tensor([[2., 7.],\n",
            "        [6., 4.],\n",
            "        [6., 5.]])\n",
            "--\n",
            "c=\n",
            "tensor([[2.0000, 7.0000],\n",
            "        [4.0000, 5.5000],\n",
            "        [4.6667, 5.3333]])\n"
          ]
        }
      ]
    },
    {
      "cell_type": "code",
      "source": [
        "# consider the following toy example:\n",
        "\n",
        "torch.manual_seed(1337)\n",
        "B,T,C = 4,8,2 # batch, time, channels\n",
        "x = torch.randn(B,T,C)\n",
        "x.shape"
      ],
      "metadata": {
        "colab": {
          "base_uri": "https://localhost:8080/"
        },
        "id": "Hs_E24uRE8kr",
        "outputId": "8bf3ff5f-565e-48b8-de8e-7272706c8e12"
      },
      "execution_count": null,
      "outputs": [
        {
          "output_type": "execute_result",
          "data": {
            "text/plain": [
              "torch.Size([4, 8, 2])"
            ]
          },
          "metadata": {},
          "execution_count": 18
        }
      ]
    },
    {
      "cell_type": "code",
      "source": [
        "# We want x[b,t] = mean_{i<=t} x[b,i]\n",
        "xbow = torch.zeros((B,T,C))\n",
        "for b in range(B):\n",
        "    for t in range(T):\n",
        "        xprev = x[b,:t+1] # (t,C)\n",
        "        xbow[b,t] = torch.mean(xprev, 0)\n"
      ],
      "metadata": {
        "id": "86NuXX0fn7ps"
      },
      "execution_count": null,
      "outputs": []
    },
    {
      "cell_type": "code",
      "source": [
        "# version 2: using matrix multiply for a weighted aggregation\n",
        "wei = torch.tril(torch.ones(T, T))\n",
        "wei = wei / wei.sum(1, keepdim=True)\n",
        "xbow2 = wei @ x # (B, T, T) @ (B, T, C) ----> (B, T, C)\n",
        "torch.allclose(xbow, xbow2)"
      ],
      "metadata": {
        "colab": {
          "base_uri": "https://localhost:8080/"
        },
        "id": "yhdOAd6-wXkZ",
        "outputId": "eaf6ab61-dff1-4bb7-e623-47f692bad5f9"
      },
      "execution_count": null,
      "outputs": [
        {
          "output_type": "execute_result",
          "data": {
            "text/plain": [
              "True"
            ]
          },
          "metadata": {},
          "execution_count": 20
        }
      ]
    },
    {
      "cell_type": "code",
      "source": [
        "# version 3: use Softmax\n",
        "tril = torch.tril(torch.ones(T, T))\n",
        "wei = torch.zeros((T,T))\n",
        "wei = wei.masked_fill(tril == 0, float('-inf'))\n",
        "wei = F.softmax(wei, dim=-1)\n",
        "xbow3 = wei @ x\n",
        "torch.allclose(xbow, xbow3)\n"
      ],
      "metadata": {
        "colab": {
          "base_uri": "https://localhost:8080/"
        },
        "id": "wOURrfG-ysoL",
        "outputId": "080b500d-8110-4602-fcef-7d6f2ebfc6bc"
      },
      "execution_count": null,
      "outputs": [
        {
          "output_type": "execute_result",
          "data": {
            "text/plain": [
              "True"
            ]
          },
          "metadata": {},
          "execution_count": 21
        }
      ]
    },
    {
      "cell_type": "code",
      "source": [
        "# version 4: self-attention!\n",
        "torch.manual_seed(1337)\n",
        "B,T,C = 4,8,32 # batch, time, channels\n",
        "x = torch.randn(B,T,C)\n",
        "\n",
        "# let's see a single Head perform self-attention\n",
        "head_size = 16\n",
        "key = nn.Linear(C, head_size, bias=False)\n",
        "query = nn.Linear(C, head_size, bias=False)\n",
        "value = nn.Linear(C, head_size, bias=False)\n",
        "k = key(x)   # (B, T, 16)\n",
        "q = query(x) # (B, T, 16)\n",
        "wei =  q @ k.transpose(-2, -1) # (B, T, 16) @ (B, 16, T) ---> (B, T, T)\n",
        "\n",
        "tril = torch.tril(torch.ones(T, T))\n",
        "#wei = torch.zeros((T,T))\n",
        "wei = wei.masked_fill(tril == 0, float('-inf'))\n",
        "wei = F.softmax(wei, dim=-1)\n",
        "\n",
        "v = value(x)\n",
        "out = wei @ v\n",
        "#out = wei @ x\n",
        "\n",
        "out.shape"
      ],
      "metadata": {
        "colab": {
          "base_uri": "https://localhost:8080/"
        },
        "id": "EDarxEWIRMKq",
        "outputId": "07b587dd-a91c-4bb0-d7f1-e247cd5dacb5"
      },
      "execution_count": null,
      "outputs": [
        {
          "output_type": "execute_result",
          "data": {
            "text/plain": [
              "torch.Size([4, 8, 16])"
            ]
          },
          "metadata": {},
          "execution_count": 22
        }
      ]
    },
    {
      "cell_type": "code",
      "source": [
        "wei[0]"
      ],
      "metadata": {
        "colab": {
          "base_uri": "https://localhost:8080/"
        },
        "id": "vT1hdtzXCjgL",
        "outputId": "6d2c569b-7922-451f-9934-0fc564678d17"
      },
      "execution_count": null,
      "outputs": [
        {
          "output_type": "execute_result",
          "data": {
            "text/plain": [
              "tensor([[1.0000, 0.0000, 0.0000, 0.0000, 0.0000, 0.0000, 0.0000, 0.0000],\n",
              "        [0.1574, 0.8426, 0.0000, 0.0000, 0.0000, 0.0000, 0.0000, 0.0000],\n",
              "        [0.2088, 0.1646, 0.6266, 0.0000, 0.0000, 0.0000, 0.0000, 0.0000],\n",
              "        [0.5792, 0.1187, 0.1889, 0.1131, 0.0000, 0.0000, 0.0000, 0.0000],\n",
              "        [0.0294, 0.1052, 0.0469, 0.0276, 0.7909, 0.0000, 0.0000, 0.0000],\n",
              "        [0.0176, 0.2689, 0.0215, 0.0089, 0.6812, 0.0019, 0.0000, 0.0000],\n",
              "        [0.1691, 0.4066, 0.0438, 0.0416, 0.1048, 0.2012, 0.0329, 0.0000],\n",
              "        [0.0210, 0.0843, 0.0555, 0.2297, 0.0573, 0.0709, 0.2423, 0.2391]],\n",
              "       grad_fn=<SelectBackward0>)"
            ]
          },
          "metadata": {},
          "execution_count": 23
        }
      ]
    },
    {
      "cell_type": "markdown",
      "source": [
        "Notes:\n",
        "- Attention is a **communication mechanism**. Can be seen as nodes in a directed graph looking at each other and aggregating information with a weighted sum from all nodes that point to them, with data-dependent weights.\n",
        "- There is no notion of space. Attention simply acts over a set of vectors. This is why we need to positionally encode tokens.\n",
        "- Each example across batch dimension is of course processed completely independently and never \"talk\" to each other\n",
        "- In an \"encoder\" attention block just delete the single line that does masking with `tril`, allowing all tokens to communicate. This block here is called a \"decoder\" attention block because it has triangular masking, and is usually used in autoregressive settings, like language modeling.\n",
        "- \"self-attention\" just means that the keys and values are produced from the same source as queries. In \"cross-attention\", the queries still get produced from x, but the keys and values come from some other, external source (e.g. an encoder module)\n",
        "- \"Scaled\" attention additional divides `wei` by 1/sqrt(head_size). This makes it so when input Q,K are unit variance, wei will be unit variance too and Softmax will stay diffuse and not saturate too much. Illustration below"
      ],
      "metadata": {
        "id": "M5CvobiQ0pLr"
      }
    },
    {
      "cell_type": "code",
      "source": [
        "k = torch.randn(B,T,head_size)\n",
        "q = torch.randn(B,T,head_size)\n",
        "wei = q @ k.transpose(-2, -1) * head_size**-0.5"
      ],
      "metadata": {
        "id": "4SNbLq5z3oBw"
      },
      "execution_count": null,
      "outputs": []
    },
    {
      "cell_type": "code",
      "source": [
        "k.var()"
      ],
      "metadata": {
        "colab": {
          "base_uri": "https://localhost:8080/"
        },
        "id": "Nl6I9n9IRTSo",
        "outputId": "0c5b9cd0-af8a-4564-fbad-41d844e54822"
      },
      "execution_count": null,
      "outputs": [
        {
          "output_type": "execute_result",
          "data": {
            "text/plain": [
              "tensor(1.0449)"
            ]
          },
          "metadata": {},
          "execution_count": 25
        }
      ]
    },
    {
      "cell_type": "code",
      "source": [
        "q.var()"
      ],
      "metadata": {
        "colab": {
          "base_uri": "https://localhost:8080/"
        },
        "id": "T1tQx7oeRvtc",
        "outputId": "3541ca1a-7447-4ef7-835e-81824aebc1b5"
      },
      "execution_count": null,
      "outputs": [
        {
          "output_type": "execute_result",
          "data": {
            "text/plain": [
              "tensor(1.0700)"
            ]
          },
          "metadata": {},
          "execution_count": 26
        }
      ]
    },
    {
      "cell_type": "code",
      "source": [
        "wei.var()"
      ],
      "metadata": {
        "colab": {
          "base_uri": "https://localhost:8080/"
        },
        "id": "MLb_odHU3iKM",
        "outputId": "a687a222-5a2c-4cdb-c1bf-17cd05b45b69"
      },
      "execution_count": null,
      "outputs": [
        {
          "output_type": "execute_result",
          "data": {
            "text/plain": [
              "tensor(1.0918)"
            ]
          },
          "metadata": {},
          "execution_count": 27
        }
      ]
    },
    {
      "cell_type": "code",
      "source": [
        "torch.softmax(torch.tensor([0.1, -0.2, 0.3, -0.2, 0.5]), dim=-1)"
      ],
      "metadata": {
        "colab": {
          "base_uri": "https://localhost:8080/"
        },
        "id": "JB82yzt44REI",
        "outputId": "f07da2f1-10bb-4a7a-bcaa-578587977d00"
      },
      "execution_count": null,
      "outputs": [
        {
          "output_type": "execute_result",
          "data": {
            "text/plain": [
              "tensor([0.1925, 0.1426, 0.2351, 0.1426, 0.2872])"
            ]
          },
          "metadata": {},
          "execution_count": 28
        }
      ]
    },
    {
      "cell_type": "code",
      "source": [
        "torch.softmax(torch.tensor([0.1, -0.2, 0.3, -0.2, 0.5])*8, dim=-1) # gets too peaky, converges to one-hot"
      ],
      "metadata": {
        "colab": {
          "base_uri": "https://localhost:8080/"
        },
        "id": "Mpt8569BB9_f",
        "outputId": "5d8b910a-6192-44ba-ebb2-497d88e0b629"
      },
      "execution_count": null,
      "outputs": [
        {
          "output_type": "execute_result",
          "data": {
            "text/plain": [
              "tensor([0.0326, 0.0030, 0.1615, 0.0030, 0.8000])"
            ]
          },
          "metadata": {},
          "execution_count": 31
        }
      ]
    },
    {
      "cell_type": "code",
      "source": [
        "class LayerNorm1d: # (used to be BatchNorm1d)\n",
        "\n",
        "  def __init__(self, dim, eps=1e-5, momentum=0.1):\n",
        "    self.eps = eps\n",
        "    self.gamma = torch.ones(dim)\n",
        "    self.beta = torch.zeros(dim)\n",
        "\n",
        "  def __call__(self, x):\n",
        "    # calculate the forward pass\n",
        "    xmean = x.mean(1, keepdim=True) # batch mean\n",
        "    xvar = x.var(1, keepdim=True) # batch variance\n",
        "    xhat = (x - xmean) / torch.sqrt(xvar + self.eps) # normalize to unit variance\n",
        "    self.out = self.gamma * xhat + self.beta\n",
        "    return self.out\n",
        "\n",
        "  def parameters(self):\n",
        "    return [self.gamma, self.beta]\n",
        "\n",
        "torch.manual_seed(1337)\n",
        "module = LayerNorm1d(100)\n",
        "x = torch.randn(32, 100) # batch size 32 of 100-dimensional vectors\n",
        "x = module(x)\n",
        "x.shape"
      ],
      "metadata": {
        "colab": {
          "base_uri": "https://localhost:8080/"
        },
        "id": "2Num7sX9CKOH",
        "outputId": "929ceb78-a639-41d6-aac7-12997b5c93f0"
      },
      "execution_count": null,
      "outputs": [
        {
          "output_type": "execute_result",
          "data": {
            "text/plain": [
              "torch.Size([32, 100])"
            ]
          },
          "metadata": {},
          "execution_count": 32
        }
      ]
    },
    {
      "cell_type": "code",
      "source": [
        "x[:,0].mean(), x[:,0].std() # mean,std of one feature across all batch inputs"
      ],
      "metadata": {
        "colab": {
          "base_uri": "https://localhost:8080/"
        },
        "id": "633T2cmnW1uk",
        "outputId": "7720fa58-0478-4e8a-86a7-502d4cce9443"
      },
      "execution_count": null,
      "outputs": [
        {
          "output_type": "execute_result",
          "data": {
            "text/plain": [
              "(tensor(0.1469), tensor(0.8803))"
            ]
          },
          "metadata": {},
          "execution_count": 33
        }
      ]
    },
    {
      "cell_type": "code",
      "source": [
        "x[0,:].mean(), x[0,:].std() # mean,std of a single input from the batch, of its features"
      ],
      "metadata": {
        "colab": {
          "base_uri": "https://localhost:8080/"
        },
        "id": "LN9cK9BoXCYb",
        "outputId": "6368ece0-600e-417d-8a91-7c1e5d750ba8"
      },
      "execution_count": null,
      "outputs": [
        {
          "output_type": "execute_result",
          "data": {
            "text/plain": [
              "(tensor(-9.5367e-09), tensor(1.0000))"
            ]
          },
          "metadata": {},
          "execution_count": 34
        }
      ]
    },
    {
      "cell_type": "code",
      "source": [
        "# French to English translation example:\n",
        "\n",
        "# <--------- ENCODE ------------------><--------------- DECODE ----------------->\n",
        "# les réseaux de neurones sont géniaux! <START> neural networks are awesome!<END>\n",
        "\n"
      ],
      "metadata": {
        "id": "dRJH6wM_XFfU"
      },
      "execution_count": null,
      "outputs": []
    },
    {
      "cell_type": "markdown",
      "source": [
        "### Full finished code, for reference\n",
        "\n",
        "You may want to refer directly to the git repo instead though."
      ],
      "metadata": {
        "id": "ZcvKeBXoZFOY"
      }
    },
    {
      "cell_type": "code",
      "source": [
        "import torch\n",
        "import torch.nn as nn\n",
        "from torch.nn import functional as F\n",
        "\n",
        "# hyperparameters\n",
        "batch_size = 16 # how many independent sequences will we process in parallel?\n",
        "block_size = 32 # what is the maximum context length for predictions?\n",
        "max_iters = 5000\n",
        "eval_interval = 100\n",
        "learning_rate = 1e-3\n",
        "device = 'cuda' if torch.cuda.is_available() else 'cpu'\n",
        "eval_iters = 200\n",
        "n_embd = 64\n",
        "n_head = 4\n",
        "n_layer = 4\n",
        "dropout = 0.0\n",
        "# ------------\n",
        "\n",
        "torch.manual_seed(1337)\n",
        "\n",
        "# wget https://raw.githubusercontent.com/karpathy/char-rnn/master/data/tinyshakespeare/input.txt\n",
        "with open('input.txt', 'r', encoding='utf-8') as f:\n",
        "    text = f.read()\n",
        "\n",
        "# here are all the unique characters that occur in this text\n",
        "chars = sorted(list(set(text)))\n",
        "vocab_size = len(chars)\n",
        "# create a mapping from characters to integers\n",
        "stoi = { ch:i for i,ch in enumerate(chars) }\n",
        "itos = { i:ch for i,ch in enumerate(chars) }\n",
        "encode = lambda s: [stoi[c] for c in s] # encoder: take a string, output a list of integers\n",
        "decode = lambda l: ''.join([itos[i] for i in l]) # decoder: take a list of integers, output a string\n",
        "\n",
        "# Train and test splits\n",
        "data = torch.tensor(encode(text), dtype=torch.long)\n",
        "n = int(0.9*len(data)) # first 90% will be train, rest val\n",
        "train_data = data[:n]\n",
        "val_data = data[n:]\n",
        "\n",
        "# data loading\n",
        "def get_batch(split):\n",
        "    # generate a small batch of data of inputs x and targets y\n",
        "    data = train_data if split == 'train' else val_data\n",
        "    ix = torch.randint(len(data) - block_size, (batch_size,))\n",
        "    x = torch.stack([data[i:i+block_size] for i in ix])\n",
        "    y = torch.stack([data[i+1:i+block_size+1] for i in ix])\n",
        "    x, y = x.to(device), y.to(device)\n",
        "    return x, y\n",
        "\n",
        "@torch.no_grad()\n",
        "def estimate_loss():\n",
        "    out = {}\n",
        "    model.eval()\n",
        "    for split in ['train', 'val']:\n",
        "        losses = torch.zeros(eval_iters)\n",
        "        for k in range(eval_iters):\n",
        "            X, Y = get_batch(split)\n",
        "            logits, loss = model(X, Y)\n",
        "            losses[k] = loss.item()\n",
        "        out[split] = losses.mean()\n",
        "    model.train()\n",
        "    return out\n",
        "\n",
        "class Head(nn.Module):\n",
        "    \"\"\" one head of self-attention \"\"\"\n",
        "\n",
        "    def __init__(self, head_size):\n",
        "        super().__init__()\n",
        "        self.key = nn.Linear(n_embd, head_size, bias=False)\n",
        "        self.query = nn.Linear(n_embd, head_size, bias=False)\n",
        "        self.value = nn.Linear(n_embd, head_size, bias=False)\n",
        "        self.register_buffer('tril', torch.tril(torch.ones(block_size, block_size)))\n",
        "\n",
        "        self.dropout = nn.Dropout(dropout)\n",
        "\n",
        "    def forward(self, x):\n",
        "        B,T,C = x.shape\n",
        "        k = self.key(x)   # (B,T,C)\n",
        "        q = self.query(x) # (B,T,C)\n",
        "        # compute attention scores (\"affinities\")\n",
        "        wei = q @ k.transpose(-2,-1) * C**-0.5 # (B, T, C) @ (B, C, T) -> (B, T, T)\n",
        "        wei = wei.masked_fill(self.tril[:T, :T] == 0, float('-inf')) # (B, T, T)\n",
        "        wei = F.softmax(wei, dim=-1) # (B, T, T)\n",
        "        wei = self.dropout(wei)\n",
        "        # perform the weighted aggregation of the values\n",
        "        v = self.value(x) # (B,T,C)\n",
        "        out = wei @ v # (B, T, T) @ (B, T, C) -> (B, T, C)\n",
        "        return out\n",
        "\n",
        "class MultiHeadAttention(nn.Module):\n",
        "    \"\"\" multiple heads of self-attention in parallel \"\"\"\n",
        "\n",
        "    def __init__(self, num_heads, head_size):\n",
        "        super().__init__()\n",
        "        self.heads = nn.ModuleList([Head(head_size) for _ in range(num_heads)])\n",
        "        self.proj = nn.Linear(n_embd, n_embd)\n",
        "        self.dropout = nn.Dropout(dropout)\n",
        "\n",
        "    def forward(self, x):\n",
        "        out = torch.cat([h(x) for h in self.heads], dim=-1)\n",
        "        out = self.dropout(self.proj(out))\n",
        "        return out\n",
        "\n",
        "class FeedFoward(nn.Module):\n",
        "    \"\"\" a simple linear layer followed by a non-linearity \"\"\"\n",
        "\n",
        "    def __init__(self, n_embd):\n",
        "        super().__init__()\n",
        "        self.net = nn.Sequential(\n",
        "            nn.Linear(n_embd, 4 * n_embd),\n",
        "            nn.ReLU(),\n",
        "            nn.Linear(4 * n_embd, n_embd),\n",
        "            nn.Dropout(dropout),\n",
        "        )\n",
        "\n",
        "    def forward(self, x):\n",
        "        return self.net(x)\n",
        "\n",
        "class Block(nn.Module):\n",
        "    \"\"\" Transformer block: communication followed by computation \"\"\"\n",
        "\n",
        "    def __init__(self, n_embd, n_head):\n",
        "        # n_embd: embedding dimension, n_head: the number of heads we'd like\n",
        "        super().__init__()\n",
        "        head_size = n_embd // n_head\n",
        "        self.sa = MultiHeadAttention(n_head, head_size)\n",
        "        self.ffwd = FeedFoward(n_embd)\n",
        "        self.ln1 = nn.LayerNorm(n_embd)\n",
        "        self.ln2 = nn.LayerNorm(n_embd)\n",
        "\n",
        "    def forward(self, x):\n",
        "        x = x + self.sa(self.ln1(x))\n",
        "        x = x + self.ffwd(self.ln2(x))\n",
        "        return x\n",
        "\n",
        "# super simple bigram model\n",
        "class BigramLanguageModel(nn.Module):\n",
        "\n",
        "    def __init__(self):\n",
        "        super().__init__()\n",
        "        # each token directly reads off the logits for the next token from a lookup table\n",
        "        self.token_embedding_table = nn.Embedding(vocab_size, n_embd)\n",
        "        self.position_embedding_table = nn.Embedding(block_size, n_embd)\n",
        "        self.blocks = nn.Sequential(*[Block(n_embd, n_head=n_head) for _ in range(n_layer)])\n",
        "        self.ln_f = nn.LayerNorm(n_embd) # final layer norm\n",
        "        self.lm_head = nn.Linear(n_embd, vocab_size)\n",
        "\n",
        "    def forward(self, idx, targets=None):\n",
        "        B, T = idx.shape\n",
        "\n",
        "        # idx and targets are both (B,T) tensor of integers\n",
        "        tok_emb = self.token_embedding_table(idx) # (B,T,C)\n",
        "        pos_emb = self.position_embedding_table(torch.arange(T, device=device)) # (T,C)\n",
        "        x = tok_emb + pos_emb # (B,T,C)\n",
        "        x = self.blocks(x) # (B,T,C)\n",
        "        x = self.ln_f(x) # (B,T,C)\n",
        "        logits = self.lm_head(x) # (B,T,vocab_size)\n",
        "\n",
        "        if targets is None:\n",
        "            loss = None\n",
        "        else:\n",
        "            B, T, C = logits.shape\n",
        "            logits = logits.view(B*T, C)\n",
        "            targets = targets.view(B*T)\n",
        "            loss = F.cross_entropy(logits, targets)\n",
        "\n",
        "        return logits, loss\n",
        "\n",
        "    def generate(self, idx, max_new_tokens):\n",
        "        # idx is (B, T) array of indices in the current context\n",
        "        for _ in range(max_new_tokens):\n",
        "            # crop idx to the last block_size tokens\n",
        "            idx_cond = idx[:, -block_size:]\n",
        "            # get the predictions\n",
        "            logits, loss = self(idx_cond)\n",
        "            # focus only on the last time step\n",
        "            logits = logits[:, -1, :] # becomes (B, C)\n",
        "            # apply softmax to get probabilities\n",
        "            probs = F.softmax(logits, dim=-1) # (B, C)\n",
        "            # sample from the distribution\n",
        "            idx_next = torch.multinomial(probs, num_samples=1) # (B, 1)\n",
        "            # append sampled index to the running sequence\n",
        "            idx = torch.cat((idx, idx_next), dim=1) # (B, T+1)\n",
        "        return idx\n",
        "\n",
        "model = BigramLanguageModel()\n",
        "m = model.to(device)\n",
        "# print the number of parameters in the model\n",
        "print(sum(p.numel() for p in m.parameters())/1e6, 'M parameters')\n",
        "\n",
        "# create a PyTorch optimizer\n",
        "optimizer = torch.optim.AdamW(model.parameters(), lr=learning_rate)\n",
        "\n",
        "for iter in range(max_iters):\n",
        "\n",
        "    # every once in a while evaluate the loss on train and val sets\n",
        "    if iter % eval_interval == 0 or iter == max_iters - 1:\n",
        "        losses = estimate_loss()\n",
        "        print(f\"step {iter}: train loss {losses['train']:.4f}, val loss {losses['val']:.4f}\")\n",
        "\n",
        "    # sample a batch of data\n",
        "    xb, yb = get_batch('train')\n",
        "\n",
        "    # evaluate the loss\n",
        "    logits, loss = model(xb, yb)\n",
        "    optimizer.zero_grad(set_to_none=True)\n",
        "    loss.backward()\n",
        "    optimizer.step()\n",
        "\n",
        "# generate from the model\n",
        "context = torch.zeros((1, 1), dtype=torch.long, device=device)\n",
        "print(decode(m.generate(context, max_new_tokens=2000)[0].tolist()))\n"
      ],
      "metadata": {
        "colab": {
          "base_uri": "https://localhost:8080/"
        },
        "id": "hoelkOrFY8bN",
        "outputId": "961304cd-e379-40d4-dd56-8de0b91d2861"
      },
      "execution_count": null,
      "outputs": [
        {
          "output_type": "stream",
          "name": "stdout",
          "text": [
            "0.209729 M parameters\n",
            "step 0: train loss 4.4116, val loss 4.4022\n",
            "step 100: train loss 2.6568, val loss 2.6670\n",
            "step 200: train loss 2.5090, val loss 2.5058\n",
            "step 300: train loss 2.4198, val loss 2.4340\n",
            "step 400: train loss 2.3503, val loss 2.3567\n",
            "step 500: train loss 2.2970, val loss 2.3136\n",
            "step 600: train loss 2.2410, val loss 2.2506\n",
            "step 700: train loss 2.2062, val loss 2.2198\n",
            "step 800: train loss 2.1638, val loss 2.1871\n",
            "step 900: train loss 2.1232, val loss 2.1494\n",
            "step 1000: train loss 2.1020, val loss 2.1293\n",
            "step 1100: train loss 2.0704, val loss 2.1196\n",
            "step 1200: train loss 2.0382, val loss 2.0798\n",
            "step 1300: train loss 2.0249, val loss 2.0640\n",
            "step 1400: train loss 1.9922, val loss 2.0354\n",
            "step 1500: train loss 1.9707, val loss 2.0308\n",
            "step 1600: train loss 1.9614, val loss 2.0474\n",
            "step 1700: train loss 1.9393, val loss 2.0130\n",
            "step 1800: train loss 1.9070, val loss 1.9943\n",
            "step 1900: train loss 1.9057, val loss 1.9871\n",
            "step 2000: train loss 1.8834, val loss 1.9954\n",
            "step 2100: train loss 1.8719, val loss 1.9758\n",
            "step 2200: train loss 1.8582, val loss 1.9623\n",
            "step 2300: train loss 1.8546, val loss 1.9517\n",
            "step 2400: train loss 1.8410, val loss 1.9476\n",
            "step 2500: train loss 1.8167, val loss 1.9455\n",
            "step 2600: train loss 1.8263, val loss 1.9401\n",
            "step 2700: train loss 1.8108, val loss 1.9340\n",
            "step 2800: train loss 1.8040, val loss 1.9247\n",
            "step 2900: train loss 1.8044, val loss 1.9304\n",
            "step 3000: train loss 1.7963, val loss 1.9242\n",
            "step 3100: train loss 1.7687, val loss 1.9147\n",
            "step 3200: train loss 1.7547, val loss 1.9102\n",
            "step 3300: train loss 1.7557, val loss 1.9037\n",
            "step 3400: train loss 1.7547, val loss 1.8946\n",
            "step 3500: train loss 1.7385, val loss 1.8968\n",
            "step 3600: train loss 1.7260, val loss 1.8914\n",
            "step 3700: train loss 1.7257, val loss 1.8808\n",
            "step 3800: train loss 1.7204, val loss 1.8919\n",
            "step 3900: train loss 1.7215, val loss 1.8788\n",
            "step 4000: train loss 1.7146, val loss 1.8639\n",
            "step 4100: train loss 1.7095, val loss 1.8724\n",
            "step 4200: train loss 1.7079, val loss 1.8707\n",
            "step 4300: train loss 1.7035, val loss 1.8502\n",
            "step 4400: train loss 1.7043, val loss 1.8693\n",
            "step 4500: train loss 1.6914, val loss 1.8522\n",
            "step 4600: train loss 1.6853, val loss 1.8357\n",
            "step 4700: train loss 1.6862, val loss 1.8483\n",
            "step 4800: train loss 1.6671, val loss 1.8434\n",
            "step 4900: train loss 1.6736, val loss 1.8415\n",
            "step 4999: train loss 1.6635, val loss 1.8226\n",
            "\n",
            "FlY BOLINGLO:\n",
            "Them thrumply towiter arts the\n",
            "muscue rike begatt the sea it\n",
            "What satell in rowers that some than othis Marrity.\n",
            "\n",
            "LUCENTVO:\n",
            "But userman these that, where can is not diesty rege;\n",
            "What and see to not. But's eyes. What?\n",
            "\n",
            "JOHN MARGARET:\n",
            "Than up I wark, what out, I ever of and love,\n",
            "one these do sponce, vois I me;\n",
            "But my pray sape to ries all to the not erralied in may.\n",
            "\n",
            "BENVOLIO:\n",
            "To spits as stold's bewear I would and say mesby all\n",
            "on sworn make he anough\n",
            "As cousins the solle, whose be my conforeful may lie them yet\n",
            "nobe allimely untraled to be thre I say be,\n",
            "Notham a brotes theme an make come,\n",
            "And that his reach to the duke ento\n",
            "the grmeants bell! and now there king-liff-or grief?\n",
            "\n",
            "GLOUCESTER:\n",
            "All the bettle dreene, for To his like thou thron!\n",
            "\n",
            "MENENIUS:\n",
            "Then, if I knom her all.\n",
            "My lord, but terruly friend\n",
            "Rish of the ploceiness and wilt tends sure?\n",
            "Is you knows a fasir wead\n",
            "That with him my spaut,\n",
            "I shall not tas where's not, becomity; my coulds sting,\n",
            "then the wit be dong to tyget our hereefore,\n",
            "Who strop me, mend here, if agains, bitten, thy lack.\n",
            "The but these it were is tus. For the her skeep the fasting. joy tweet Bumner:-\n",
            "How the enclady: It you and how,\n",
            "I am in him, And ladderle:\n",
            "Their hand whose wife, it my hithre,\n",
            "Roman and where sposs gives'd you.\n",
            "\n",
            "TROMIOLANUS:\n",
            "But livants you great, I shom mistrot come, for to she to lot\n",
            "for smy to men ventry mehus. Gazise;\n",
            "Full't were some the cause, and stouch set,\n",
            "Or promises, which a kingsasted to your gove them; and sterrer,\n",
            "And that wae love him.\n",
            "\n",
            "BRUTUS:\n",
            "You shape with these sweet.\n",
            "\n",
            "CORTENGONO:\n",
            "Lo, where 'twon elmes, 'morth young agres;\n",
            "Sir, azavoust to striel accurded we missery sets crave.\n",
            "\n",
            "ANGOLUM:\n",
            "For is Henry to have gleise the dreason\n",
            "That I ant shorfold wefth their servy in enscy.\n",
            "\n",
            "ISABELLA:\n",
            "O, I better you eyse such formfetrews.\n",
            "\n",
            "BUCKINGHARENT:\n",
            "Qead my lightle this righanneds flase them\n",
            "Wam which an take was our some pleasurs,\n",
            "Lovisoname to me, then fult me?--have it?\n",
            "\n",
            "HENRY BOLINGBROY:\n",
            "That wha\n"
          ]
        }
      ]
    },
    {
      "cell_type": "code",
      "source": [],
      "metadata": {
        "id": "fjjvMifYZf7x"
      },
      "execution_count": null,
      "outputs": []
    }
  ]
}