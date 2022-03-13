import heapq
from database import book_info

def getBiggestNumbers(dict, k):
    if k == 0:
        return []
    
    list = []
    for key in dict:
        item = [key, float(dict[key]["score"])]
        list.append(item)
    
    hp = list[:k]
    heapq.heapify(hp)
    for item in range(k, len(list)):
        score = list[item][1]
        if hp[0][1] < score:
            heapq.heapreplace(hp, list[item])
            
    return hp

if __name__ == '__main__':
   a = getBiggestNumbers(book_info, 3)
   print(a)