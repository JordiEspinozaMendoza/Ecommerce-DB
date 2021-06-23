import re
def hasNumbers(str):
    return re.search(r'\d', str)