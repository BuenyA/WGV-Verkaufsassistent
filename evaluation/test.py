from ragas import evaluate
from datasets import Dataset
import os

from langchain_community.document_loaders import DirectoryLoader
loader = DirectoryLoader("C:\\Users\\aydem\\Documents\\salesassistent\\dataset\\test")
documents = loader.load()