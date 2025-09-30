import pandas as pd
import random 

num_influencers = 1000

def random_split(values,total=100):
    parts = [random.randint(5,40) for _ in values]
    s = sum(parts)
    return {v: round(p*total/s, 2) for v,p in zip(values, parts)}

def generate_influencer(i):
    category = random.choices(
        ["nano","micro","mid","macro","mega"],
        weights=[0.2,0.3,0.3,0.15,0.05]
    )[0]
    
    if category == "nano":
        followers = random.randint(1000,10000)
        engagement_rate = round(random.uniform(0.05,0.15),4)
    elif category == "micro":
        followers = random.randint(10000,100000)
        engagement_rate = round(random.uniform(0.03,0.10),4)
    elif category == "mid":
        followers = random.randint(100000,500000)
        engagement_rate = round(random.uniform(0.02,0.07), 4)
    elif category == "macro":
        followers = random.randint(500000,1000000)
        engagement_rate = round(random.uniform(0.01,0.05), 4)
    else:
        followers = random.randint(1000000,5000000)
        engagement_rate = round(random.uniform(0.005,0.03), 4)
        
    avg_engagements = int(followers * engagement_rate)
    avg_reach = random.randint(int(followers*0.4),int(followers*0.6))
    avg_impressions = random.randint(avg_reach, int(avg_reach*2))
    
    gender_split = random_split(["male","female"])
    age_split = random_split(["13-17","18-24","25-34","35-44","45-54","55+"])
    country_split = random_split(["India","USA","UK","UAE", "Germany"],total=100)
    top_countries = dict(sorted(country_split.items(), key=lambda x: x[1], reverse=True)[:3])
    city_split = random_split(["Mumbai","Delhi","Bangalore","Hyderabad","Chennai","Kolkata","New York","London"],total=100) 
    top_cities = dict(sorted(city_split.items(), key=lambda x: x[1], reverse=True)[:3])
    
    growth_rate = round(random.uniform(-0.05,0.2), 3)
    
    return [
        i, category, followers, avg_reach, avg_impressions, engagement_rate, avg_engagements,
        gender_split, age_split, top_countries, top_cities, growth_rate
    ]   
    
data = [generate_influencer(i) for i in range(1, num_influencers+1)]

columns = [
    "influencer_id", "influencer_size_category", "followers_count",
    "avg_reach", "avg_impressions", "engagement_rate",
    "avg_engagements_per_post", "audience_gender_split",
    "audience_age_split", "audience_country_top3",
    "audience_city_top3", "follower_growth_rate"
]    

df = pd.DataFrame(data, columns=columns)
df.to_csv("realistic_instagram_influencers.csv", index=False)

print("✅ Realistic dummy dataset of Instagram influencers generated and saved to 'realistic_instagram_influencers.csv")
    