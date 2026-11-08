import gradio as gr

def greet(name,intensity):
    return "Hello " + name + "!" * intensity

demo = gr.Interface(fn=greet,inputs=[gr.Textbox(),gr.Slider(1,10)],outputs="text")

demo.launch(server_name="127.0.0.1",server_port=7860,share=True)