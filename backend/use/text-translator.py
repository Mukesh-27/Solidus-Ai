from deep_translator import GoogleTranslator

# Breaking the paragraph into smaller chunks
text_parts = [
    "In the labyrinthine corridors of human cognition, the juxtaposition of empirical scrutiny and abstract reasoning engenders a profound paradigm of intellectual evolution.",
    "The confluence of antiquated epistemologies and contemporary heuristics delineates the trajectory of our cognitive odyssey.",
    "As linguistic idiosyncrasies interweave with cultural nuances, the semantic elasticity of lexicons fosters an ever-expanding repository of knowledge.",
    "The incessant dialectic between deductive postulations and inductive extrapolations constitutes the bedrock of philosophical inquiry, propelling humanity toward an asymptotic comprehension of existential veracities."
]

translated_text = [GoogleTranslator(source='auto', target='ta').translate(part) for part in text_parts]

# Joining the translated parts
final_translation = " ".join(translated_text)

print(final_translation)
