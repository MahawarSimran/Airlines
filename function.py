model_name = "deepset/roberta-base-squad2"
from transformers import pipeline
import csv
from fuzzywuzzy import process
import numpy as np
from dateutil.parser import parse
import difflib

days = ['monday', 'tuesday', 'wednesday',  'thursday', 'friday', 'saturday', 'sunday']
months = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"]
correct_words = days+months

def read_first_column(csv_file):
    texts = []
    with open(csv_file, 'r') as file:
        csv_reader = csv.reader(file)
        for row in csv_reader:
            texts.append(row[0])  # Assuming the first column is at index 0
    return texts

# Example usage
csv_file = 'airports.csv'  # Replace 'example.csv' with your CSV file path
city_list = read_first_column(csv_file)

def get_better_text(text):
    corrected_sentence = []
    for word in text.split():
        closest_match = difflib.get_close_matches(word, city_list, n=1, cutoff=0.7)
        if closest_match:
            corrected_sentence.append(closest_match[0])
        else:
            corrected_sentence.append(word)
    return ' '.join(corrected_sentence)


def find_best_fuzzy_match(input_word, threshold=50):
    # Use fuzzy matching to find the closest match in the list
    best_match, score = process.extractOne(input_word, city_list)
    if score > threshold:
        return best_match
    else:
        return "NONE"

def get_destination(text):
    text = get_better_text(text)
    nlp = pipeline('question-answering', model=model_name, tokenizer=model_name)
    QA_input = {
        'question': 'go to which city?',
        'context': text
    }
    res = nlp(QA_input)
    return find_best_fuzzy_match(res['answer'])

def get_source(text):
    text = get_better_text(text)
    nlp = pipeline('question-answering', model=model_name, tokenizer=model_name)
    QA_input = {
        'question': 'go from which city?',
        'context': text
    }
    res = nlp(QA_input)
    return find_best_fuzzy_match(res['answer'])

def get_date(text):
    corrected_sentence = []
    for word in text.split():
        closest_match = difflib.get_close_matches(word, correct_words, n=1, cutoff=0.7)
        if closest_match:
            corrected_sentence.append(closest_match[0])
        else:
            corrected_sentence.append(word)
    text = ' '.join(corrected_sentence)
    try:
        date = str(parse(text, fuzzy=True))
        date = date[0:10]
    except:
        date = "NONE"
    return date

st = "I want to go from delh to kokat on 10 may"
print(get_destination(st))
print(get_source(st))
print(get_date(st))