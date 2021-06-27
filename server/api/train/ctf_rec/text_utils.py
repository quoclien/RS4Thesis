import re
# import nltk
# nltk.download()
from nltk.tokenize import RegexpTokenizer
from nltk.corpus import stopwords

def remove_non_ascii(s):
        return "".join(i for i in s if ord(i) < 128)

def make_lower_case(text):
    return text.lower()

# def remove_stop_words(text):
#     text = text.split()
#     stops = set(stopwords.words("english"))
#     text = [w for w in text if not w in stops]
#     text = " ".join(text)
#     return text

def remove_html(text):
    html_pattern = re.compile('<.*?>')
    return html_pattern.sub(r'', text)

def remove_punctuation(text):
    tokenizer = RegexpTokenizer(r'\w+')
    text = tokenizer.tokenize(text)
    text = " ".join(text)
    return text