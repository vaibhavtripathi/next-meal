import ujson

# fo = open('./essential-ingredients.log', 'w')

with open('/Users/vaibhavt/cook-suggest/recipe-ingredients.log', 'r') as f:
    logs = f.readlines()

ingredientList = []

for log in logs:
    recipe = ujson.loads(log.strip('\n'))
    for item in recipe['ingredients']:
        ingredientList.append(item)

from collections import Counter
ingredientCount = Counter(ingredientList)

print(ingredientCount)