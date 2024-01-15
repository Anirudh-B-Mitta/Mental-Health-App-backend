# import openai
import ast
from openai import OpenAI
import os

os.environ['OPENAI_API_KEY']='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'

client = OpenAI()
messages = [ {"role":"system", "content":"You are a mental health chatbot. Please feel free to talk about your mental health."} ]
while True:
    user_input = input("User: ")

    if user_input:
        messages.append({"role": "user", "content": user_input})

        def check_mental_health_related(user_input):

            # Convert the user input to lowercase for case-insensitive matching
            user_input_lower = user_input.lower()

            # Open the file and read its content
            with open('mental health terms.txt', 'r') as file:
                content = file.read()
                # print(content)

            # Parse the content as a Python list using ast.literal_eval
            mental_health_keywords = ast.literal_eval(content)

            # Check if any mental health keyword is present in the user input
            for keyword in mental_health_keywords:
                if keyword in user_input_lower:
                    return True

            # If no specific mental health keyword is found, consider it not related
            return False

        # Check if the user's input is related to mental health
        is_mental_health_related = check_mental_health_related(user_input)

        if is_mental_health_related:
            response =  client.chat.completions.create(
                model="gpt-3.5-turbo", messages=messages, temperature=0.5
            )

            reply = response.choices[0].message.content
             
            print(f"ChatGPT: {reply}")
            messages.append({"role": "assistant", "content": reply})
        else:
            print("ChatGPT: It sounds like you want to talk about something important. Please feel free to share your thoughts and feelings related to mental health.")
    else:
        print("ChatGPT: Please enter a message.")
